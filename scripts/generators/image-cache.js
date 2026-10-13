import fs from 'fs';
import path from 'path';

const ASSETS_DIR = path.resolve('assets/vietnam');

const IMAGE_FILES = {
  // Real Vietnamese Estates
  thaoDien: 'villa_thao_dien.jpg',
  tayHo: 'villa_tay_ho.jpg',
  baDinh: 'villa_ba_dinh.jpg',
  hoiAn: 'resort_hoi_an.jpg',
  daNang: 'villa_da_nang.jpg',
  vtnBamboo: 'vtn_bamboo_compound.jpg',
  
  // 360 Rooms & Spatial Views
  atrium: 'living_room_atrium.jpg',
  kitchen: 'kitchen_teak_wood.jpg',
  bedroom: 'master_bedroom_zen.jpg',
  pool: 'sunset_infinity_pool.jpg',
  
  // Real Avatars
  voTrongNghia: 'avatar_vo_trong_nghia.jpg',
  hoangThucHao: 'avatar_hoang_thuc_hao.jpg',
  vietnameseLady: 'avatar_concierge_female.jpg',
  broker: 'avatar_broker_male.jpg',
  architectMale: 'avatar_architect_male.jpg',

  // Real Google Maps Vietnam
  mapSaigon: 'map_saigon.jpg',
  mapThuThiem: 'map_thu_thiem.jpg',
  mapTayHo: 'map_tay_ho.jpg'
};

const B64_CACHE = {};

export function getImageBase64(hint = '') {
  const h = hint.toLowerCase();
  let selectedFile = IMAGE_FILES.thaoDien;

  if (h.includes('map')) {
    selectedFile = IMAGE_FILES.mapSaigon;
  } else if (h.includes('bamboo') || h.includes('compound') || h.includes('sanctuary')) {
    selectedFile = IMAGE_FILES.vtnBamboo;
  } else if (h.includes('vo trong nghia') || h.includes('vtn') || h.includes('portrait') || h.includes('architect') || h.includes('avatar')) {
    selectedFile = IMAGE_FILES.voTrongNghia;
  } else if (h.includes('lady') || h.includes('concierge') || h.includes('host')) {
    selectedFile = IMAGE_FILES.vietnameseLady;
  } else if (h.includes('broker') || h.includes('agent')) {
    selectedFile = IMAGE_FILES.broker;
  } else if (h.includes('pool') || h.includes('sunset')) {
    selectedFile = IMAGE_FILES.pool;
  } else if (h.includes('atrium') || h.includes('living')) {
    selectedFile = IMAGE_FILES.atrium;
  } else if (h.includes('kitchen') || h.includes('dining')) {
    selectedFile = IMAGE_FILES.kitchen;
  } else if (h.includes('bedroom') || h.includes('master')) {
    selectedFile = IMAGE_FILES.bedroom;
  } else if (h.includes('hoi an') || h.includes('wood') || h.includes('resort')) {
    selectedFile = IMAGE_FILES.hoiAn;
  } else if (h.includes('tay ho') || h.includes('hanoi') || h.includes('lake')) {
    selectedFile = IMAGE_FILES.tayHo;
  } else if (h.includes('ba dinh') || h.includes('colonial') || h.includes('heritage')) {
    selectedFile = IMAGE_FILES.baDinh;
  } else if (h.includes('da nang') || h.includes('ocean')) {
    selectedFile = IMAGE_FILES.daNang;
  }

  if (B64_CACHE[selectedFile]) {
    return B64_CACHE[selectedFile];
  }

  const p = path.join(ASSETS_DIR, selectedFile);
  if (fs.existsSync(p)) {
    B64_CACHE[selectedFile] = fs.readFileSync(p).toString('base64');
    return B64_CACHE[selectedFile];
  }

  return null;
}
