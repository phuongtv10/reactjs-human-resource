import React from "react";
import { Button, notification as antdNotification } from "antd";
import {
  CloseCircleFilled,
  InfoCircleFilled,
  CheckCircleFilled
} from "@ant-design/icons";

antdNotification.config({
  placement: "topRight",
  duration: 0,
  top: 0
});

export const notification = {
    error: ({ message, description }: any) => {
      antdNotification.error({
        message,
        description,
        className: "notification",
        style: {
          width: 600,
          minWidth: 320,
          maxWidth: 568,
          backgroundColor: "#fff1f0",
          border: "1px solid #ffa39e",
          margin: 0,
          boxShadow: "unset"
        },
        icon: <CloseCircleFilled style={{ color: "#f5222e" }} />
      });
    },
    warning: ({ message, description }: any) => {
      antdNotification.warning({
        message,
        description,
        className: "notification",
        style: {
          width: 600,
          minWidth: 320,
          maxWidth: 568,
          backgroundColor: "#fffbe6",
          border: "1px solid #ffe58f",
          margin: 0,
          boxShadow: "unset"
        },
        icon: <InfoCircleFilled style={{ color: "#f9bf02" }} />
      });
    },
    success: ({ message, description }: any) => {
      antdNotification.success({
        message,
        description,
        className: "notification",
        style: {
          width: 300,
          minWidth: 320,
          maxWidth: 368,
          backgroundColor: "#F6FFED",
          border: "1px solid #B7EB8F",
          margin: 0,
          boxShadow: "unset"
        },
        icon: <CheckCircleFilled style={{ color: "#52C51A" }} />
      });
    },
    close: () => {
      antdNotification.destroy()
    }
  };