import { defineMock } from "umi";

type DeviceData = {
  id: string;
  name: string;
  warn?: boolean;
  position?: { top: number; left: number };
  [key: string]: any;
};

let deviceDatas: DeviceData[] = [
  { id: "1", name: "rackA_1", warn: true },
  { id: "2", name: "rackA_2", warn: false },
  { id: "3", name: "rackA_3", warn: false },
  { id: "4", name: "rackA_4", warn: false },
  { id: "5", name: "rackA_5", warn: false },
  { id: "11", name: "rackA_6", warn: true },
  { id: "12", name: "rackA_7", warn: false },
  { id: "13", name: "rackA_8", warn: false },
  { id: "14", name: "rackA_9", warn: false },
  { id: "15", name: "rackA_10", warn: false },
  { id: "6", name: "rackB_6", warn: true },
  { id: "7", name: "rackB_7", warn: true },
  { id: "8", name: "rackB_8", warn: false },
  { id: "9", name: "rackB_9", warn: true },
  { id: "10", name: "rackB_1", warn: false },
  { id: "16", name: "rackB_2", warn: true },
  { id: "17", name: "rackB_3", warn: true },
  { id: "18", name: "rackB_4", warn: false },
  { id: "19", name: "rackB_5", warn: true },
  { id: "20", name: "rackB_10", warn: false },
];

export default defineMock({
  "GET /api/getDeviceDatas": (_, res) => {
    res.send({
      status: "ok",
      data: deviceDatas,
    });
  },
});
