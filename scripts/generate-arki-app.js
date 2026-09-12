#!/usr/bin/env node
// ARKI - Luxury Real Estate & Architecture App Generator
// Generates 5 Screens with Real Architectural Images, Video Player, Gallery Slider, and Interactive Prototypes

const BRIDGE_URL = process.env.BRIDGE_URL || 'http://localhost:8765';

// High-resolution architectural photography from Unsplash
const IMAGES = {
  villaPool: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  villaFront: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  livingRoom: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  kitchen: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
  sunsetEstate: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  brutalistVilla: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
};

const arkiAppBatch = {
  action: 'BATCH_EXECUTE',
  params: {
    steps: [
      // =========================================================================
      // SCREEN 1: SPLASH & LOADING SCREEN (393 x 852)
      // =========================================================================
      {
        action: 'CREATE_FRAME',
        ref: 'screen_splash',
        params: {
          name: 'ARKI / 01 - Splash Loading',
          width: 393,
          height: 852,
          x: 0,
          y: 0,
          backgroundColor: '#07090E',
          cornerRadius: 44,
          clipsContent: true
        }
      },
      // Subtle architectural background cover
      {
        action: 'CREATE_RECTANGLE',
        params: {
          parentId: '$screen_splash',
          name: 'Background Accent Image',
          width: 393,
          height: 852,
          x: 0,
          y: 0,
          imageUrl: IMAGES.villaPool,
          color: '#0F172A'
        }
      },
      // Dark gradient overlay
      {
        action: 'CREATE_RECTANGLE',
        params: {
          parentId: '$screen_splash',
          name: 'Dark Overlay',
          width: 393,
          height: 852,
          x: 0,
          y: 0,
          color: '#07090ECC'
        }
      },
      // Brand Logo & Typography
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_splash',
          text: 'A R K I',
          fontSize: 38,
          fontFamily: 'Inter',
          fontStyle: 'Bold',
          color: '#F8FAFC',
          x: 40,
          y: 340
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_splash',
          text: 'Architectural Estates & Modern Living',
          fontSize: 16,
          fontFamily: 'Inter',
          fontStyle: 'Medium',
          color: '#38BDF8',
          x: 40,
          y: 395
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_splash',
          text: 'Curating world-class brutalist, minimalist, and contemporary residences by master architects.',
          fontSize: 14,
          fontFamily: 'Inter',
          fontStyle: 'Regular',
          color: '#94A3B8',
          x: 40,
          y: 430
        }
      },
      // Loading Pill
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_splash',
          name: 'Loading Bar Container',
          width: 313,
          height: 6,
          x: 40,
          y: 720,
          backgroundColor: '#1E293B',
          cornerRadius: 3
        }
      },
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_splash',
          name: 'Loading Progress Active',
          width: 210,
          height: 6,
          x: 40,
          y: 720,
          backgroundColor: '#38BDF8',
          cornerRadius: 3
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_splash',
          text: 'Loading architectural catalog...',
          fontSize: 12,
          color: '#64748B',
          x: 40,
          y: 740
        }
      },

      // =========================================================================
      // SCREEN 2: HOME / EXPLORE CATALOG (x: 480)
      // =========================================================================
      {
        action: 'CREATE_FRAME',
        ref: 'screen_home',
        params: {
          name: 'ARKI / 02 - Explore Estates',
          width: 393,
          height: 852,
          x: 480,
          y: 0,
          backgroundColor: '#090D16',
          cornerRadius: 44,
          clipsContent: true
        }
      },
      // Top Header
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_home',
          text: 'Discover Architecture',
          fontSize: 24,
          fontFamily: 'Inter',
          fontStyle: 'Bold',
          color: '#F8FAFC',
          x: 24,
          y: 56
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_home',
          text: 'Da Nang & International Curations',
          fontSize: 13,
          color: '#94A3B8',
          x: 24,
          y: 88
        }
      },
      // Filter Category Pills
      {
        action: 'CREATE_BUTTON',
        params: {
          parentId: '$screen_home',
          name: 'Tab / All',
          text: 'All Works',
          backgroundColor: '#38BDF8',
          textColor: '#090D16',
          fontSize: 13,
          cornerRadius: 20,
          paddingX: 16,
          paddingY: 8,
          x: 24,
          y: 124
        }
      },
      {
        action: 'CREATE_BUTTON',
        params: {
          parentId: '$screen_home',
          name: 'Tab / Villas',
          text: 'Villas & Estates',
          backgroundColor: '#1E293B',
          textColor: '#E2E8F0',
          fontSize: 13,
          cornerRadius: 20,
          paddingX: 16,
          paddingY: 8,
          x: 120,
          y: 124
        }
      },
      {
        action: 'CREATE_BUTTON',
        params: {
          parentId: '$screen_home',
          name: 'Tab / Minimalist',
          text: 'Minimalism',
          backgroundColor: '#1E293B',
          textColor: '#E2E8F0',
          fontSize: 13,
          cornerRadius: 20,
          paddingX: 16,
          paddingY: 8,
          x: 248,
          y: 124
        }
      },

      // HERO FEATURED ESTATE CARD (Clickable to Screen 3)
      {
        action: 'CREATE_FRAME',
        ref: 'hero_card',
        params: {
          parentId: '$screen_home',
          name: 'Featured / The Glass Sanctuary',
          width: 345,
          height: 380,
          x: 24,
          y: 180,
          backgroundColor: '#131B2E',
          cornerRadius: 24,
          clipsContent: true
        }
      },
      // Card Hero Image
      {
        action: 'CREATE_RECTANGLE',
        params: {
          parentId: '$hero_card',
          name: 'Hero Image Pool',
          width: 345,
          height: 230,
          x: 0,
          y: 0,
          imageUrl: IMAGES.villaPool,
          color: '#1E293B'
        }
      },
      // Status Badge on Image
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$hero_card',
          name: 'Badge / Exclusive',
          width: 140,
          height: 30,
          x: 16,
          y: 16,
          backgroundColor: '#0F172ACC',
          cornerRadius: 15,
          layoutMode: 'HORIZONTAL',
          padding: 8
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$hero_card',
          text: '★ Pritzker Architecture',
          fontSize: 11,
          fontStyle: 'Medium',
          color: '#38BDF8',
          x: 24,
          y: 22
        }
      },
      // Video Indicator Icon Badge
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$hero_card',
          name: 'Badge / Video Tour',
          width: 110,
          height: 30,
          x: 220,
          y: 16,
          backgroundColor: '#0284C7DD',
          cornerRadius: 15
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$hero_card',
          text: '▶ 4K VR Tour',
          fontSize: 11,
          fontStyle: 'Bold',
          color: '#FFFFFF',
          x: 238,
          y: 22
        }
      },
      // Card Metadata & Specs
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$hero_card',
          text: 'The Glass Sanctuary Villa',
          fontSize: 19,
          fontStyle: 'Bold',
          color: '#F8FAFC',
          x: 18,
          y: 246
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$hero_card',
          text: 'Son Tra Peninsula • Architect Tadao Ando',
          fontSize: 13,
          color: '#94A3B8',
          x: 18,
          y: 274
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$hero_card',
          text: '4 Suites  •  5 Baths  •  850 m²  •  Private Cliff Beach',
          fontSize: 12,
          color: '#64748B',
          x: 18,
          y: 302
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$hero_card',
          text: '$4,250,000',
          fontSize: 20,
          fontStyle: 'Bold',
          color: '#38BDF8',
          x: 18,
          y: 335
        }
      },
      // View Details CTA inside Card
      {
        action: 'CREATE_BUTTON',
        ref: 'btn_explore_details',
        params: {
          parentId: '$hero_card',
          name: 'Button / View Details',
          text: 'View Villa →',
          backgroundColor: '#38BDF8',
          textColor: '#090D16',
          fontSize: 12,
          cornerRadius: 12,
          paddingX: 16,
          paddingY: 10,
          x: 235,
          y: 330
        }
      },

      // SECONDARY VILLA CARD (x: 24, y: 580)
      {
        action: 'CREATE_FRAME',
        ref: 'card_concrete_pavilion',
        params: {
          parentId: '$screen_home',
          name: 'Card / The Concrete Pavilion',
          width: 345,
          height: 130,
          x: 24,
          y: 580,
          backgroundColor: '#131B2E',
          cornerRadius: 20,
          clipsContent: true
        }
      },
      {
        action: 'CREATE_RECTANGLE',
        params: {
          parentId: '$card_concrete_pavilion',
          name: 'Image Concrete',
          width: 120,
          height: 130,
          x: 0,
          y: 0,
          imageUrl: IMAGES.villaFront,
          color: '#1E293B'
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$card_concrete_pavilion',
          text: 'The Concrete Pavilion',
          fontSize: 16,
          fontStyle: 'Bold',
          color: '#F8FAFC',
          x: 136,
          y: 18
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$card_concrete_pavilion',
          text: 'Minimalist Brutalism • 620 m²',
          fontSize: 12,
          color: '#94A3B8',
          x: 136,
          y: 44
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$card_concrete_pavilion',
          text: '$3,400,000',
          fontSize: 16,
          fontStyle: 'Bold',
          color: '#38BDF8',
          x: 136,
          y: 85
        }
      },

      // Bottom Navigation Bar (x: 0, y: 760)
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_home',
          name: 'Navigation Bar',
          width: 393,
          height: 92,
          x: 0,
          y: 760,
          backgroundColor: '#070A10F2'
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_home',
          text: '◉ Explore    ♡ Saved    ▷ Tours    👤 Profile',
          fontSize: 15,
          fontStyle: 'Medium',
          color: '#F8FAFC',
          x: 48,
          y: 795
        }
      },

      // =========================================================================
      // SCREEN 3: PROPERTY DETAILS & VR TOUR (x: 960)
      // =========================================================================
      {
        action: 'CREATE_FRAME',
        ref: 'screen_details',
        params: {
          name: 'ARKI / 03 - Villa Details & Tour',
          width: 393,
          height: 852,
          x: 960,
          y: 0,
          backgroundColor: '#090D16',
          cornerRadius: 44,
          clipsContent: true
        }
      },
      // Main Property Hero Image
      {
        action: 'CREATE_RECTANGLE',
        params: {
          parentId: '$screen_details',
          name: 'Hero Big Photo',
          width: 393,
          height: 340,
          x: 0,
          y: 0,
          imageUrl: IMAGES.villaPool,
          color: '#1E293B'
        }
      },
      // Floating Back Button
      {
        action: 'CREATE_BUTTON',
        ref: 'btn_back_to_home',
        params: {
          parentId: '$screen_details',
          name: 'Button / Back',
          text: '← Back',
          backgroundColor: '#07090ECC',
          textColor: '#FFFFFF',
          fontSize: 13,
          cornerRadius: 12,
          paddingX: 14,
          paddingY: 8,
          x: 24,
          y: 54
        }
      },
      // Floating Save Bookmark Button
      {
        action: 'CREATE_BUTTON',
        params: {
          parentId: '$screen_details',
          name: 'Button / Save',
          text: '♡ Save',
          backgroundColor: '#07090ECC',
          textColor: '#FFFFFF',
          fontSize: 13,
          cornerRadius: 12,
          paddingX: 14,
          paddingY: 8,
          x: 300,
          y: 54
        }
      },

      // Play Video Tour Button Overlay on Hero Photo
      {
        action: 'CREATE_BUTTON',
        ref: 'btn_play_video',
        params: {
          parentId: '$screen_details',
          name: 'Button / Watch Video Tour',
          text: '▶  Watch 4K Cinematic Video Tour (03:20)',
          backgroundColor: '#0284C7',
          textColor: '#FFFFFF',
          fontSize: 14,
          cornerRadius: 24,
          paddingX: 22,
          paddingY: 14,
          x: 32,
          y: 260
        }
      },

      // Architectural Specs & Description
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_details',
          text: 'The Glass Sanctuary Villa',
          fontSize: 24,
          fontStyle: 'Bold',
          color: '#F8FAFC',
          x: 24,
          y: 360
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_details',
          text: 'Architect: Tadao Ando Architects & Associates (2025)',
          fontSize: 13,
          color: '#38BDF8',
          x: 24,
          y: 395
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_details',
          text: 'Seamless indoor-outdoor living framed by cast concrete, Low-E tempered glass walls, and a cantilevered infinity pool meeting the ocean horizon.',
          fontSize: 13,
          color: '#94A3B8',
          x: 24,
          y: 425
        }
      },

      // Photo Gallery Slider Strip (Interactive Thumbnails)
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_details',
          text: 'Architectural Gallery (Tap to view slider)',
          fontSize: 14,
          fontStyle: 'Bold',
          color: '#E2E8F0',
          x: 24,
          y: 495
        }
      },
      // Thumbnail 1: Pool Exterior
      {
        action: 'CREATE_RECTANGLE',
        params: {
          parentId: '$screen_details',
          name: 'Thumb / Pool Exterior',
          width: 78,
          height: 78,
          x: 24,
          y: 525,
          imageUrl: IMAGES.villaPool,
          color: '#1E293B',
          cornerRadius: 12
        }
      },
      // Thumbnail 2: Interior Living (CLICKABLE -> Opens Slider Screen 5)
      {
        action: 'CREATE_RECTANGLE',
        ref: 'thumb_interior_living',
        params: {
          parentId: '$screen_details',
          name: 'Thumb / Interior Living',
          width: 78,
          height: 78,
          x: 110,
          y: 525,
          imageUrl: IMAGES.livingRoom,
          color: '#1E293B',
          cornerRadius: 12
        }
      },
      // Thumbnail 3: Kitchen
      {
        action: 'CREATE_RECTANGLE',
        params: {
          parentId: '$screen_details',
          name: 'Thumb / Minimalist Kitchen',
          width: 78,
          height: 78,
          x: 196,
          y: 525,
          imageUrl: IMAGES.kitchen,
          color: '#1E293B',
          cornerRadius: 12
        }
      },
      // Thumbnail 4: Sunset
      {
        action: 'CREATE_RECTANGLE',
        params: {
          parentId: '$screen_details',
          name: 'Thumb / Sunset Villa',
          width: 78,
          height: 78,
          x: 282,
          y: 525,
          imageUrl: IMAGES.sunsetEstate,
          color: '#1E293B',
          cornerRadius: 12
        }
      },

      // Specs Matrix Grid
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_details',
          name: 'Specs Container',
          width: 345,
          height: 70,
          x: 24,
          y: 625,
          backgroundColor: '#131B2E',
          cornerRadius: 16
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_details',
          text: '4 Master Bedrooms      5 En-Suite Baths      850 m² Land Area',
          fontSize: 12,
          fontStyle: 'Medium',
          color: '#E2E8F0',
          x: 36,
          y: 650
        }
      },

      // Sticky Bottom Booking Bar
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_details',
          name: 'Bottom Booking Bar',
          width: 393,
          height: 100,
          x: 0,
          y: 752,
          backgroundColor: '#070A10'
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_details',
          text: '$4,250,000',
          fontSize: 22,
          fontStyle: 'Bold',
          color: '#38BDF8',
          x: 24,
          y: 775
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_details',
          text: 'Freehold Title • Fully Furnished',
          fontSize: 11,
          color: '#64748B',
          x: 24,
          y: 805
        }
      },
      {
        action: 'CREATE_BUTTON',
        params: {
          parentId: '$screen_details',
          name: 'Button / Book Tour',
          text: 'Schedule Viewing',
          backgroundColor: '#38BDF8',
          textColor: '#090D16',
          fontSize: 14,
          cornerRadius: 16,
          paddingX: 20,
          paddingY: 14,
          x: 220,
          y: 772
        }
      },

      // =========================================================================
      // SCREEN 4: CINEMATIC VIDEO PLAYER MODAL (x: 1440)
      // =========================================================================
      {
        action: 'CREATE_FRAME',
        ref: 'screen_video_player',
        params: {
          name: 'ARKI / 04 - Video Tour Player',
          width: 393,
          height: 852,
          x: 1440,
          y: 0,
          backgroundColor: '#020408',
          cornerRadius: 44,
          clipsContent: true
        }
      },
      // Video Full Screen Frame
      {
        action: 'CREATE_RECTANGLE',
        params: {
          parentId: '$screen_video_player',
          name: 'Video Stream Frame',
          width: 393,
          height: 520,
          x: 0,
          y: 120,
          imageUrl: IMAGES.livingRoom,
          color: '#0F172A'
        }
      },
      // Video Top Controls: Close Button & Resolution
      {
        action: 'CREATE_BUTTON',
        ref: 'btn_close_video',
        params: {
          parentId: '$screen_video_player',
          name: 'Button / Close Video',
          text: '✕ Close Tour',
          backgroundColor: '#1E293BEE',
          textColor: '#FFFFFF',
          fontSize: 13,
          cornerRadius: 20,
          paddingX: 16,
          paddingY: 10,
          x: 24,
          y: 56
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_video_player',
          text: '4K HDR • 60 FPS • Spatial Audio',
          fontSize: 12,
          color: '#38BDF8',
          x: 200,
          y: 65
        }
      },
      // Live Video Playback HUD
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_video_player',
          name: 'Video HUD Overlay',
          width: 345,
          height: 120,
          x: 24,
          y: 670,
          backgroundColor: '#0B0F1AE6',
          cornerRadius: 20,
          padding: 18
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_video_player',
          text: 'Chapter 2: Master Living Pavilion & Glass Atrium',
          fontSize: 14,
          fontStyle: 'Bold',
          color: '#F8FAFC',
          x: 42,
          y: 690
        }
      },
      // Timeline Track
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_video_player',
          name: 'Timeline Background',
          width: 309,
          height: 6,
          x: 42,
          y: 724,
          backgroundColor: '#334155',
          cornerRadius: 3
        }
      },
      // Timeline Played
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_video_player',
          name: 'Timeline Active',
          width: 170,
          height: 6,
          x: 42,
          y: 724,
          backgroundColor: '#38BDF8',
          cornerRadius: 3
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_video_player',
          text: '01:45 / 03:20',
          fontSize: 12,
          color: '#94A3B8',
          x: 42,
          y: 745
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_video_player',
          text: '⏸ Pause    🔊 100%    ⛶ Fullscreen',
          fontSize: 12,
          fontStyle: 'Medium',
          color: '#38BDF8',
          x: 180,
          y: 745
        }
      },

      // =========================================================================
      // SCREEN 5: ARCHITECTURAL GALLERY SLIDER (x: 1920)
      // =========================================================================
      {
        action: 'CREATE_FRAME',
        ref: 'screen_gallery_slider',
        params: {
          name: 'ARKI / 05 - Photo Slider Gallery',
          width: 393,
          height: 852,
          x: 1920,
          y: 0,
          backgroundColor: '#020408',
          cornerRadius: 44,
          clipsContent: true
        }
      },
      // Fullscreen Image Slide
      {
        action: 'CREATE_RECTANGLE',
        params: {
          parentId: '$screen_gallery_slider',
          name: 'Full Slide Image',
          width: 393,
          height: 580,
          x: 0,
          y: 100,
          imageUrl: IMAGES.livingRoom,
          color: '#0F172A'
        }
      },
      // Close Gallery Button
      {
        action: 'CREATE_BUTTON',
        ref: 'btn_close_gallery',
        params: {
          parentId: '$screen_gallery_slider',
          name: 'Button / Close Gallery',
          text: '✕ Close Gallery',
          backgroundColor: '#1E293BEE',
          textColor: '#FFFFFF',
          fontSize: 13,
          cornerRadius: 20,
          paddingX: 16,
          paddingY: 10,
          x: 24,
          y: 56
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_gallery_slider',
          text: 'Slide 2 of 4',
          fontSize: 13,
          fontStyle: 'Medium',
          color: '#94A3B8',
          x: 300,
          y: 65
        }
      },
      // Image Caption & Details
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_gallery_slider',
          name: 'Caption Box',
          width: 345,
          height: 110,
          x: 24,
          y: 700,
          backgroundColor: '#0B0F1AE6',
          cornerRadius: 20,
          padding: 16
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_gallery_slider',
          text: 'Living Pavilion • Natural Biophilic Lighting',
          fontSize: 15,
          fontStyle: 'Bold',
          color: '#F8FAFC',
          x: 40,
          y: 718
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_gallery_slider',
          text: 'Custom minimalist Italian travertine stone, fluted glass partitions, and seamless underfloor heating.',
          fontSize: 12,
          color: '#94A3B8',
          x: 40,
          y: 744
        }
      },
      // Slider Dots Indicator
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_gallery_slider',
          text: '○  ●  ○  ○',
          fontSize: 18,
          color: '#38BDF8',
          x: 165,
          y: 660
        }
      },

      // =========================================================================
      // PROTOTYPING INTERACTIONS WIRING (Connecting the screens!)
      // =========================================================================

      // 1. Splash Screen: Auto transition AFTER_TIMEOUT (1.5s) -> Home Screen
      {
        action: 'ADD_INTERACTION',
        params: {
          sourceNodeId: '$screen_splash',
          targetNodeId: '$screen_home',
          trigger: 'AFTER_TIMEOUT',
          timeout: 1.5,
          transitionType: 'DISSOLVE',
          duration: 0.45,
          easing: 'EASE_OUT'
        }
      },

      // 2. Home Screen: Click "View Villa" CTA -> Villa Details Screen (SMART_ANIMATE)
      {
        action: 'ADD_INTERACTION',
        params: {
          sourceNodeId: '$btn_explore_details',
          targetNodeId: '$screen_details',
          trigger: 'ON_CLICK',
          transitionType: 'SMART_ANIMATE',
          duration: 0.4,
          easing: 'EASE_OUT'
        }
      },

      // 3. Villa Details: Click Back Button -> Returns to Home Screen
      {
        action: 'ADD_INTERACTION',
        params: {
          sourceNodeId: '$btn_back_to_home',
          targetNodeId: '$screen_home',
          trigger: 'ON_CLICK',
          transitionType: 'SLIDE_OUT',
          direction: 'RIGHT',
          duration: 0.35,
          easing: 'EASE_OUT'
        }
      },

      // 4. Villa Details: Click "Watch 4K Video Tour" -> Opens Video Player Screen
      {
        action: 'ADD_INTERACTION',
        params: {
          sourceNodeId: '$btn_play_video',
          targetNodeId: '$screen_video_player',
          trigger: 'ON_CLICK',
          transitionType: 'SMART_ANIMATE',
          duration: 0.4,
          easing: 'EASE_OUT'
        }
      },

      // 5. Video Player: Click "Close Tour" -> Returns to Villa Details
      {
        action: 'ADD_INTERACTION',
        params: {
          sourceNodeId: '$btn_close_video',
          targetNodeId: '$screen_details',
          trigger: 'ON_CLICK',
          transitionType: 'DISSOLVE',
          duration: 0.3,
          easing: 'EASE_OUT'
        }
      },

      // 6. Villa Details: Tap Interior Photo Thumbnail -> Opens Slider Gallery Screen
      {
        action: 'ADD_INTERACTION',
        params: {
          sourceNodeId: '$thumb_interior_living',
          targetNodeId: '$screen_gallery_slider',
          trigger: 'ON_CLICK',
          transitionType: 'SMART_ANIMATE',
          duration: 0.4,
          easing: 'EASE_OUT'
        }
      },

      // 7. Slider Gallery: Click "Close Gallery" -> Returns to Villa Details
      {
        action: 'ADD_INTERACTION',
        params: {
          sourceNodeId: '$btn_close_gallery',
          targetNodeId: '$screen_details',
          trigger: 'ON_CLICK',
          transitionType: 'SLIDE_OUT',
          direction: 'BOTTOM',
          duration: 0.35,
          easing: 'EASE_OUT'
        }
      },

      // =========================================================================
      // REGISTER PROTOTYPE FLOW STARTING POINT
      // =========================================================================
      {
        action: 'CREATE_FLOW',
        params: {
          frameId: '$screen_splash',
          flowName: 'ARKI — Architectural Living & Luxury Estates Flow'
        }
      }
    ]
  }
};

async function generateApp() {
  console.log('🏛️ Dispatching ARKI Architecture & Real Estate App to Figma Bridge...');
  console.log(`   - Endpoint: ${BRIDGE_URL}/execute`);
  console.log(`   - Total Steps: ${arkiAppBatch.params.steps.length}`);

  try {
    const res = await fetch(`${BRIDGE_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arkiAppBatch)
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('❌ Generation failed:', data.error);
      process.exit(1);
    }

    console.log('\n=============================================================');
    console.log('🎉 ARKI ARCHITECTURE APP GENERATED SUCCESSFULLY IN FIGMA!');
    console.log('=============================================================');
    console.log(`   - Screens Created: 5 screens (Splash, Home, Details, Video, Slider)`);
    console.log(`   - Interactions Wired: 7 interactive prototype transitions`);
    console.log(`   - Flow Starting Point: "ARKI — Architectural Living & Luxury Estates Flow"`);
    console.log('\n👉 Go to Figma Desktop and press Shift + Space to start testing!');
  } catch (err) {
    console.error('❌ Failed to dispatch:', err.message);
  }
}

generateApp();
