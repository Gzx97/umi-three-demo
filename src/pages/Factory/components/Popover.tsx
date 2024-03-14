import React from "react";
import styles from "./Popover.less";
import { Descriptions, Typography } from "antd";
export type PopoverProps = {
  top?: number;
  left?: number;
  show?: boolean;
  data?: Record<string, any>;
};

const Popover: React.FC<PopoverProps> = ({
  top = 0,
  left = 0,
  show = false,
  data = { title: "" },
}) => {
  const position = {
    top: `${top}px`,
    left: `${left}px`,
  };
  return (
    <div
      style={{
        ...position,
        display: show ? "block" : "none",
        color: "white",
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
};

export default Popover;
