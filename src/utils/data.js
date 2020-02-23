export default {
  pirep: [{
    id: 1,
    reg_no: 'ABC1230',
    defects: [1,2]
  },{
    id: 2,
    reg_no: 'ABC4560',
    defects: [2,3,4]
  }],
  line_planning: [{
    id: 1,
    defects: [1,2,3],
    reg_no: 'ABC1230',
    ata_chapter: '011',
    ata_subchapter: '10',
    maintenance_manual: 'https://random.url/maintenance-manual'
  },{
    id: 2,
    defects: [2,3,4],
    reg_no: 'ABC4560',
    ata_chapter: '011',
    ata_subchapter: '10',
    maintenance_manual: 'https://random.url/maintenance-manual'
  }],
  materials: [{
    id: 1,
    name: 'Engine',
    p_n: 'ABC1230',
    s_n: '011',
    status: true
  },{
    id: 2,
    name: 'Oil Sensor',
    p_n: 'ABC4560',
    s_n: '011',
    status: false
  }],
  line_maintenance: [{
    id: 1,
    lp: 1
  },{
    id: 2,
    lp: 2
  }],
  tech_records: [{
    id: 1,
    materials: [1,2],
    status: true
  },{
    id: 2,
    materials: [1,2],
    status: false
  }]
}