import React, { useImperativeHandle, useRef } from "react";
import styles from "./Popover.less";
import { Descriptions, Typography } from "antd";
export type PopoverProps = {
  top?: number;
  left?: number;
  show?: boolean;
  data?: Record<string, any>;
  [key: string]: any;
};

const Popover = React.forwardRef<any, PopoverProps>(
  ({ show = false, data = { title: "" }, viewer }, ref) => {
    // const popoverRef = useRef(null);
    // console.log(ref);
    // useImperativeHandle(ref, () => ({
    //   getDom: popoverRef.current,
    // }));
    return (
      <div
        // ref={popoverRef}
        ref={ref}
        style={{
          // ...position,
          opacity: show ? "1" : "0",
          display: "none",
          color: "white",
          position: "absolute",
        }}
        className={styles.wrapper}
      >
        <Descriptions
          labelStyle={{ color: "white" }}
          contentStyle={{ color: "white" }}
          column={1}
          title={<div style={{ color: "white" }}>{data?.title}</div>}
        >
          <Descriptions.Item label="温度">{data?.title}℃</Descriptions.Item>
          <Descriptions.Item label="湿度">{data?.title}</Descriptions.Item>
          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Remark">empty</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
);

export default Popover;
