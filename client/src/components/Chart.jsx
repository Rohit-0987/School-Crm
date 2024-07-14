import React, { Fragment, useState } from "react";
import { AgChartsReact } from "ag-charts-react";

export const ChartExample = (data) => {
  const [options, setOptions] = useState({
    data: [
        { asset: "Male", amount: data.data.numMaleStudents },
        { asset: "Female", amount: data.data.numFemaleStudents },
    ],
    title: {
      text: "Gender",
    },
    series: [
        {
            type: 'pie',
            angleKey: 'amount',
            calloutLabelKey: 'asset',
            sectorLabelKey: 'amount',
            sectorLabel: {
                color: 'white',
                fontWeight: 'bold',
            },
        },
    ],
  });

  return <AgChartsReact options={options} />;
};