import { height, width } from "../Components/Dimensions/Dimensions";

const latitudeDelta = 0.0922;
const longitudeDelta = width/height * latitudeDelta;

export default { latitudeDelta, longitudeDelta }