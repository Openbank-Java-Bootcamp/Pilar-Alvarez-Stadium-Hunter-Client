import Pie from "react-native-pie";
import { StyleSheet, View, Text } from "react-native";

function HuntPieChart() {
  return (
    <div>
      <View style={{ width: 175, alignItems: "center" }}>
        <Pie
          radius={80}
          innerRadius={75}
          sections={[
            {
              percentage: 60,
              color: "#f00",
            },
          ]}
          backgroundColor="#ddd"
        />
        <View style={styles.gauge}>
          <Text style={styles.gaugeText}>60%</Text>
        </View>
      </View>
    </div>
  );
}
export default HuntPieChart;
