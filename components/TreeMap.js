import React from "react";
import { ResponsiveTreeMap } from "@nivo/treemap";

const CustomTreeMap = ({ data }) => {
  return (
    <div
      className="place-self-center"
      style={{ height: 300, width: "50%", minWidth: 300 }}
    >
      <ResponsiveTreeMap
        data={data}
        identity="name"
        value="value"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
        parentLabelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
      />
    </div>
  );
};

export default CustomTreeMap;
