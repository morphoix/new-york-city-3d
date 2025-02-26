export const PIN_DATA = [
  {
    lng: -74.01327999403387,
    lat: 40.705805891665335,
    markerType: "issue",
  },
  {
    lng: -74.01225019708487,
    lat: 40.70704556885883,
    markerType: "asset",
  },
  {
    lng: -74.0116908420995,
    lat: 40.70795309930534,
    markerType: "asset",
  },
  {
    lng: -74.01077896535476,
    lat: 40.7088278784191,
    markerType: "asset",
  },
  { lng: -74.00923322640702, lat: 40.710791025780225, markerType: "issue" },
  { lng: -74.00845775342795, lat: 40.71154436177133, markerType: "asset" },
  { lng: -74.00577837181807, lat: 40.714877982406705, markerType: "issue" },
  { lng: -74.00347440482076, lat: 40.717424789462825, markerType: "asset" },
  { lng: -74.00382644379143, lat: 40.71705255752974, markerType: "issue" },
  { lng: -74.00258013333077, lat: 40.71867868153521, markerType: "asset" },
  { lng: -74.00240172431045, lat: 40.718721522987124, markerType: "asset" },
  { lng: -74.00042113847783, lat: 40.72119058750951, markerType: "issue" },
  { lng: -73.99960498527565, lat: 40.7220405529967, markerType: "issue" },
  {
    lng: -73.99780728847762,
    lat: 40.72427663640511,
    markerType: "asset",
  },
  { lng: -73.99670526828548, lat: 40.72558055537132, markerType: "issue" },
  { lat: 40.72964839321864, lng: -73.99314664684255, markerType: "issue" },
  { lng: -73.99139882637559, lat: 40.731780021977016, markerType: "asset" },
  // { lng: -73.99129914566755, lat: 40.73220485422823, markerType: "issue" },
  // { lng: -73.9920929045027, lat: 40.72913842310189, markerType: "issue" },
  // { lng: -74.00225412308488, lat: 40.755179887052634, markerType: "issue" },
  // { lng: -74.00345998669629, lat: 40.75631644426571, markerType: "asset" },
  // { lng: -74.0031403894127, lat: 40.75386066932066, markerType: "issue" },
  // { lng: -74.00357030725395, lat: 40.75649691269834, markerType: "asset" },
  // { lng: -74.00467636036744, lat: 40.756991335350534, markerType: "issue" },
];

export const INITIAL_STATE = {
  center: {
    lng: -74.01897864383386,
    lat: 40.67474425059973,
  },
  zoom: 11.958890648061853,
  pitch: 77.49999999999986,
  bearing: 26.194442146608367,
};

export const KEYFRAME_SET = [
  {
    center: {
      lng: -74.01310451731223,
      lat: 40.70632895528516,
    },
    zoom: 16.62779386381024,
    pitch: 77.49999999999986,
    bearing: 26.194442146608367,
    duration: 6000,
  },
  {
    center: {
      lng: -74.01317930365444,
      lat: 40.70630149901169,
    },
    zoom: 19.021145241837708,
    pitch: 83.49999999999993,
    bearing: 26.194442146608026,
    duration: 2000,
  },
  {
    center: {
      lng: -74.0047580327103,
      lat: 40.7159500821401,
    },
    zoom: 18.740047416864392,
    pitch: 76.4999999999999,
    bearing: 34.194442146608935,
    duration: 15000,
  },
  {
    "center": {
        "lng": -73.9850222856223,
        "lat": 40.739771135222725
    },
    "zoom": 16.16813993423998,
    "pitch": 84.99999999999997,
    "bearing": 30.910411475398405
,
    duration: 15000,
  },
];

export const ANIMATION_DURATION = KEYFRAME_SET.reduce(
  (acc, keyframe) => acc + keyframe.duration,
  0
);