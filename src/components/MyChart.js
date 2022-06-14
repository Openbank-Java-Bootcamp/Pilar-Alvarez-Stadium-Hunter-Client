import Chart from "chart.js/auto";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function MyChart(props) {
  const data = {
    labels: ["Hunted", "To Hunt"],
    datasets: [
      {
        label: "My First Dataset",
        data: [props.hunted.length, 1300 - props.hunted.length],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <div>
      <Pie data={data} height={150} options={options} />
    </div>
  );
}
export default MyChart;
