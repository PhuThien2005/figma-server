-- =============================================================================
-- ARKI 360 VIRTUAL TOUR & ARCHITECTURAL ECOSYSTEM DATABASE SCHEMA
-- Target Engine: PostgreSQL 15+
-- Modules: Virtual Tours, Multi-floor Plans, 360 Scenes, Hotspots, Measurements,
--          Live Co-touring Sessions, Analytics Heatmap & Partitions.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. NHÓM QUẢN LÝ TOUR & KHÔNG GIAN ĐA TẦNG (VIRTUAL TOURS & MULTI-FLOOR)
-- =============================================================================

-- Bảng virtual_tours: Quản lý thực thể tour trung tâm
CREATE TABLE virtual_tours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_by_user_id UUID NOT NULL, -- FK tới users
    property_id UUID NULL,            -- Liên kết BĐS (nếu là tin đăng bán/thuê)
    project_id UUID NULL,             -- Liên kết Portfolio (nếu là dự án KTS)
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    cover_image_url TEXT NOT NULL,
    first_scene_id UUID NULL,         -- Scene khởi đầu khi mở tour (FK added below)
    status VARCHAR(30) DEFAULT 'DRAFT' 
        CHECK (status IN ('DRAFT', 'PROCESSING', 'PUBLISHED', 'ARCHIVED')),
    settings JSONB DEFAULT '{
        "auto_rotate": false,
        "auto_rotate_speed": 1.5,
        "default_fov": 80,
        "min_fov": 40,
        "max_fov": 110,
        "gyroscope_enabled": true,
        "vr_mode_enabled": true,
        "brand_watermark_url": null
    }'::jsonb,
    view_count BIGINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Bảng floor_plans: Sơ đồ mặt bằng 2D các tầng kiến trúc
CREATE TABLE floor_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID NOT NULL REFERENCES virtual_tours(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,       -- Ví dụ: "Tầng trệt", "Lầu 1", "Tầng áp mái"
    floor_level INT NOT NULL DEFAULT 0, -- Thứ tự tầng (-1: hầm, 0: trệt, 1: lầu 1...)
    plan_image_url TEXT NOT NULL,      -- File ảnh/SVG mặt bằng 2D kiến trúc
    width_px INT NOT NULL,
    height_px INT NOT NULL,
    north_rotation_deg NUMERIC(5,2) DEFAULT 0.00 
        CHECK (north_rotation_deg >= 0 AND north_rotation_deg < 360), -- Độ lệch hướng Bắc
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Bảng tour_scenes: Các điểm chụp Panorama / Nút không gian 360
CREATE TABLE tour_scenes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID NOT NULL REFERENCES virtual_tours(id) ON DELETE CASCADE,
    floor_plan_id UUID NULL REFERENCES floor_plans(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,       -- Ví dụ: "Phòng khách - Góc nhìn Sofa"
    room_category VARCHAR(50) NOT NULL 
        CHECK (room_category IN ('LIVING_ROOM', 'KITCHEN', 'MASTER_BEDROOM', 'GUEST_ROOM', 'BATHROOM', 'BALCONY', 'GARDEN', 'ROOFTOP', 'CORRIDOR', 'OTHER')),
    projection_type VARCHAR(30) DEFAULT 'EQUIRECTANGULAR' 
        CHECK (projection_type IN ('EQUIRECTANGULAR', 'CUBEMAP')),
    
    -- Tài nguyên hình ảnh đa phân giải
    original_panorama_url TEXT NOT NULL, 
    preview_blur_url TEXT NOT NULL,      -- Ảnh siêu nhẹ (~30KB) để tải tức thì
    tile_base_path TEXT NULL,            -- Base URL cho Multi-resolution tiles (Deep Zoom/Marzipano)
    
    -- Tọa độ góc nhìn mặc định khi bước vào phòng
    default_yaw NUMERIC(6,3) DEFAULT 0.000 
        CHECK (default_yaw >= -180.000 AND default_yaw <= 180.000),
    default_pitch NUMERIC(6,3) DEFAULT 0.000 
        CHECK (default_pitch >= -90.000 AND default_pitch <= 90.000),
    default_fov NUMERIC(5,2) DEFAULT 80.00,
    
    -- Cân chỉnh la bàn thực tế (North Correction)
    heading_north_offset NUMERIC(6,3) DEFAULT 0.000,
    
    -- Tọa độ chuẩn hóa trên sơ đồ mặt bằng 2D (0.0000 -> 1.0000)
    floor_plan_x NUMERIC(6,4) NULL CHECK (floor_plan_x >= 0 AND floor_plan_x <= 1),
    floor_plan_y NUMERIC(6,4) NULL CHECK (floor_plan_y >= 0 AND floor_plan_y <= 1),
    
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Ràng buộc khóa ngoại cho scene mặc định của tour
ALTER TABLE virtual_tours 
ADD CONSTRAINT fk_first_scene 
FOREIGN KEY (first_scene_id) REFERENCES tour_scenes(id) ON DELETE SET NULL;

-- =============================================================================
-- 2. PHÂN HỆ ĐIỂM TƯƠNG TÁC (HOTSPOTS) & DỮ LIỆU VẬT LIỆU, ĐIỀU HƯỚNG
-- =============================================================================

-- Bảng hotspots: Bảng lõi định vị không gian 360 (Tọa độ cầu Spherical Coordinates)
CREATE TABLE hotspots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scene_id UUID NOT NULL REFERENCES tour_scenes(id) ON DELETE CASCADE,
    type VARCHAR(40) NOT NULL 
        CHECK (type IN ('NAVIGATION', 'MATERIAL_INFO', 'FURNITURE_ITEM', 'BEFORE_AFTER_SLIDER', 'MEDIA_POPUP')),
    title VARCHAR(150),
    
    -- Tọa độ cầu (Spherical Coordinates)
    yaw NUMERIC(6,3) NOT NULL CHECK (yaw >= -180.000 AND yaw <= 180.000),
    pitch NUMERIC(6,3) NOT NULL CHECK (pitch >= -90.000 AND pitch <= 90.000),
    distance_factor NUMERIC(4,2) DEFAULT 1.00, -- Chiều sâu trực quan để phóng to/thu nhỏ icon
    
    -- Giao diện điểm ghim
    icon_type VARCHAR(50) DEFAULT 'STANDARD_CIRCLE',
    custom_icon_url TEXT NULL,
    color_hex VARCHAR(7) DEFAULT '#0066FF',
    animation_type VARCHAR(30) DEFAULT 'PULSE' CHECK (animation_type IN ('NONE', 'PULSE', 'BOUNCE', 'ROTATE')),
    
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Bảng hotspot_navigations: Cổng chuyển phòng ảo (Portal / Scene Linking)
CREATE TABLE hotspot_navigations (
    hotspot_id UUID PRIMARY KEY REFERENCES hotspots(id) ON DELETE CASCADE,
    target_scene_id UUID NOT NULL REFERENCES tour_scenes(id) ON DELETE CASCADE,
    target_yaw NUMERIC(6,3) NULL,   -- Hướng nhìn ép buộc khi bước vào phòng đích
    target_pitch NUMERIC(6,3) NULL,
    transition_effect VARCHAR(30) DEFAULT 'FADE_TO_BLACK' 
        CHECK (transition_effect IN ('FADE_TO_BLACK', 'ZOOM_IN', 'CROSS_FADE', 'INSTANT'))
);

-- Bảng hotspot_materials: Đặc tả vật tư kiến trúc & nội thất
CREATE TABLE hotspot_materials (
    hotspot_id UUID PRIMARY KEY REFERENCES hotspots(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,      -- Ví dụ: "Gạch ốp tường Terrazzo Ý M-8802"
    category VARCHAR(100) NOT NULL,      -- "Gỗ/Ván sàn", "Sơn tường", "Thiết bị vệ sinh", "Sofa"...
    brand_name VARCHAR(150),             -- "An Cường", "Dulux", "TOTO", "Hafele"...
    model_sku VARCHAR(100),              -- Mã hàng / SKU
    dimensions VARCHAR(100),             -- Kích thước thực tế: "2400 x 900 x 750 mm"
    estimated_price NUMERIC(15,2) NULL,  -- Giá tham khảo
    currency VARCHAR(10) DEFAULT 'VND',
    supplier_affiliate_url TEXT NULL,    -- Đường dẫn đặt mua / đại lý chính hãng
    cad_drawing_url TEXT NULL,           -- Đường dẫn file PDF/CAD mặt cắt cấu tạo
    swatch_image_url TEXT NULL,          -- Hình ảnh mẫu chụp macro bề mặt vân/màu
    specifications JSONB DEFAULT '{}'::jsonb -- Thông số phụ: độ bóng, chống cháy, bảo hành...
);

-- Bảng hotspot_before_after: Chế độ trượt so sánh Hiện trạng vs Thiết kế 3D
CREATE TABLE hotspot_before_after (
    hotspot_id UUID PRIMARY KEY REFERENCES hotspots(id) ON DELETE CASCADE,
    comparison_scene_id UUID NOT NULL REFERENCES tour_scenes(id) ON DELETE CASCADE,
    slider_direction VARCHAR(20) DEFAULT 'HORIZONTAL' 
        CHECK (slider_direction IN ('HORIZONTAL', 'VERTICAL')),
    sync_rotation BOOLEAN DEFAULT true,   -- Khi khách xoay góc nào, scene kia xoay theo y hệt
    label_before VARCHAR(50) DEFAULT 'Hiện trạng',
    label_after VARCHAR(50) DEFAULT 'Thiết kế 3D'
);

-- Bảng hotspot_media: Tài liệu truyền thông nhúng (Image, Video, Audio, GLTF)
CREATE TABLE hotspot_media (
    hotspot_id UUID PRIMARY KEY REFERENCES hotspots(id) ON DELETE CASCADE,
    media_type VARCHAR(30) NOT NULL CHECK (media_type IN ('IMAGE_GALLERY', 'YOUTUBE_EMBED', 'AUDIO_GUIDE', '3D_GLTF_MODEL')),
    media_urls TEXT[] NOT NULL,
    description TEXT,
    auto_play BOOLEAN DEFAULT false
);

-- =============================================================================
-- 3. PHÂN HỆ THƯỚC ĐO ẢO (VIRTUAL MEASUREMENT TOOL)
-- =============================================================================

CREATE TABLE scene_measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scene_id UUID NOT NULL REFERENCES tour_scenes(id) ON DELETE CASCADE,
    measurement_label VARCHAR(150) NOT NULL, -- Ví dụ: "Chiều cao trần", "Khoảng lọt lòng tủ lạnh"
    
    -- Tọa độ Điểm A
    point_a_yaw NUMERIC(6,3) NOT NULL,
    point_a_pitch NUMERIC(6,3) NOT NULL,
    point_a_depth_meters NUMERIC(6,3) NOT NULL, -- Khoảng cách từ Camera -> Điểm A
    
    -- Tọa độ Điểm B
    point_b_yaw NUMERIC(6,3) NOT NULL,
    point_b_pitch NUMERIC(6,3) NOT NULL,
    point_b_depth_meters NUMERIC(6,3) NOT NULL, -- Khoảng cách từ Camera -> Điểm B
    
    calculated_distance_meters NUMERIC(6,3) NOT NULL, -- Khoảng cách thực tế giữa 2 điểm
    created_by_user_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 4. PHÂN HỆ ĐỒNG BỘ XEM TRỰC TUYẾN TỪ XA (LIVE CO-TOURING SESSIONS)
-- =============================================================================

CREATE TABLE co_tour_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID NOT NULL REFERENCES virtual_tours(id) ON DELETE CASCADE,
    host_user_id UUID NOT NULL,          -- Môi giới hoặc KTS chủ trì
    session_code VARCHAR(20) UNIQUE NOT NULL, -- Mã mời ví dụ: "COT-782-991"
    
    -- Trạng thái điều khiển không gian thời gian thực
    current_scene_id UUID NOT NULL REFERENCES tour_scenes(id),
    current_yaw NUMERIC(6,3) DEFAULT 0.000,
    current_pitch NUMERIC(6,3) DEFAULT 0.000,
    current_zoom NUMERIC(5,2) DEFAULT 80.00,
    
    is_control_locked BOOLEAN DEFAULT true, -- Khách bị khóa góc nhìn theo Host
    laser_pointer_coords JSONB NULL,        -- {"yaw": 12.4, "pitch": -4.2, "active": true}
    webrtc_room_id VARCHAR(100) NOT NULL,
    
    status VARCHAR(30) DEFAULT 'ACTIVE' 
        CHECK (status IN ('WAITING', 'ACTIVE', 'PAUSED', 'ENDED')),
    started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMPTZ NULL
);

CREATE TABLE co_tour_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES co_tour_sessions(id) ON DELETE CASCADE,
    user_id UUID NULL,                   -- NULL nếu là khách vãng lai dùng Web/App Guest
    client_name VARCHAR(100) NOT NULL,
    client_role VARCHAR(20) DEFAULT 'GUEST' 
        CHECK (client_role IN ('HOST', 'CO_HOST', 'GUEST')),
    is_audio_muted BOOLEAN DEFAULT false,
    joined_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMPTZ NULL
);

-- =============================================================================
-- 5. PHÂN HỆ BÁO CÁO HÀNH VI & BẢN ĐỒ NHIỆT (ANALYTICS HEATMAP & PARTITIONS)
-- =============================================================================

CREATE TABLE tour_analytics_events (
    id BIGSERIAL,
    tour_id UUID NOT NULL REFERENCES virtual_tours(id) ON DELETE CASCADE,
    scene_id UUID NOT NULL REFERENCES tour_scenes(id) ON DELETE CASCADE,
    visitor_session_id VARCHAR(100) NOT NULL,
    user_id UUID NULL,
    
    dwell_time_seconds INT NOT NULL DEFAULT 0, -- Thời gian dừng lại xem phòng
    view_center_yaw NUMERIC(6,3) NOT NULL,     -- Khu vực góc nhìn tập trung nhiều nhất
    view_center_pitch NUMERIC(6,3) NOT NULL,
    
    clicked_hotspot_id UUID NULL REFERENCES hotspots(id) ON DELETE SET NULL,
    device_category VARCHAR(30) CHECK (device_category IN ('MOBILE_IOS', 'MOBILE_ANDROID', 'DESKTOP_WEB', 'VR_HEADSET')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Tạo Partition mẫu cho Tháng 10/2026 và Tháng 11/2026
CREATE TABLE tour_analytics_2026_10 PARTITION OF tour_analytics_events
    FOR VALUES FROM ('2026-10-01 00:00:00+00') TO ('2026-11-01 00:00:00+00');

CREATE TABLE tour_analytics_2026_11 PARTITION OF tour_analytics_events
    FOR VALUES FROM ('2026-11-01 00:00:00+00') TO ('2026-12-01 00:00:00+00');

-- =============================================================================
-- 6. INDEXING TỐI ƯU HÓA HIỆU NĂNG CAO (HIGH PERFORMANCE INDEXES)
-- =============================================================================

-- Tăng tốc truy vấn Scenes & Hotspots
CREATE INDEX idx_scenes_tour_id ON tour_scenes(tour_id);
CREATE INDEX idx_scenes_floor_plan ON tour_scenes(floor_plan_id);
CREATE INDEX idx_hotspots_scene_id ON hotspots(scene_id);

-- Tăng tốc tra cứu vật liệu nội thất
CREATE INDEX idx_materials_brand ON hotspot_materials(brand_name);
CREATE INDEX idx_materials_category ON hotspot_materials(category);

-- GIN Index cho JSONB Settings & Specs
CREATE INDEX idx_tours_settings_gin ON virtual_tours USING GIN (settings);
CREATE INDEX idx_materials_specs_gin ON hotspot_materials USING GIN (specifications);

-- Tối ưu thống kê thời gian thực Analytics theo Tour
CREATE INDEX idx_analytics_tour_time ON tour_analytics_events(tour_id, created_at DESC);
CREATE INDEX idx_co_tour_session_code ON co_tour_sessions(session_code);
