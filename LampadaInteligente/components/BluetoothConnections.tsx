import React from "react";
import {
    Text,
    View,
    Button,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
} from "react-native";
var _ = require("lodash");

import BluetoothSerial from "react-native-bluetooth-serial";

export default class BluetoothConnections extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEnabled: false,
            discovering: false,
            devices: [],
            unpairedDevices: [],
            connected: false,
        };
    }

    componentWillMount() {
        Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
            (values) => {
                const [isEnabled, devices] = values;

                this.setState({ isEnabled, devices });
            }
        );

        BluetoothSerial.on("bluetoothEnabled", () => {
            Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list(),
            ]).then((values) => {
                const [isEnabled, devices] = values;
                this.setState({ devices });
            });

            BluetoothSerial.on("bluetoothDisabled", () => {
                this.setState({ devices: [] });
            });
            BluetoothSerial.on("error", (err) =>
                console.log(`Error: ${err.message}`)
            );
        });
    }

    connect(device) {
        this.setState({ connecting: true });
        BluetoothSerial.connect(device.id)
            .then((res) => {
                console.log(`Connected to device ${device.name}`);

                ToastAndroid.show(
                    `Connected to device ${device.name}`,
                    ToastAndroid.SHORT
                );
            })
            .catch((err) => console.log(err.message));
    }
    _renderItem(item) {
        return (
            <TouchableOpacity onPress={() => this.connect(item.item)}>
                <View>
                    <Text>{item.item.name ? item.item.name : "-"}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    enable() {
        BluetoothSerial.enable()
            .then((res) => this.setState({ isEnabled: true }))
            .catch((err) => ToastAndroid.showShortBottom(err.message));
    }

    disable() {
        BluetoothSerial.disable()
            .then((res) => this.setState({ isEnabled: false }))
            .catch((err) => ToastAndroid.showShortBottom(err.message));
    }

    toggleBluetooth(value) {
        if (value === true) {
            this.enable();
        } else {
            this.disable();
        }
    }

    discoverAvailableDevices() {
        if (this.state.discovering) {
            return false;
        } else {
            this.setState({ discovering: true });
            BluetoothSerial.discoverUnpairedDevices()
                .then((unpairedDevices) => {
                    const uniqueDevices = _.uniqBy(unpairedDevices, "id");
                    console.log(uniqueDevices);
                    this.setState({
                        unpairedDevices: uniqueDevices,
                        discovering: false,
                    });
                })
                .catch((err) => console.log(err.message));
        }
    }

    toggleSwitch() {
        BluetoothSerial.write("T")
            .then((res) => {
                console.log(res);
                console.log("Successfuly wrote to device");
                this.setState({ connected: true });
            })
            .catch((err) => console.log(err.message));
    }

    render() {
        return (
            <View>
                <Switch
                    trackColor={{ false: "grey", true: "grey" }}
                    thumbColor={isEnabled ? "tomato" : "blue"}
                    ios_backgroundColor="grey"
                    onValueChange={(val) => this.toggleBluetooth(val)}
                    value={this.state.isEnabled}
                />
                <View style={{ margin: 30 }}>
                    <Button
                        title="Escanear dispositivos"
                        color="#841584"
                        onPress={this.discoverAvailableDevices.bind(this)}
                    />
                </View>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.devices}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) => this._renderItem(item)}
                />
                <Button
                    onPress={this.toggleSwitch.bind(this)}
                    title="Switch(On/Off)"
                    color="#841584"
                />
            </View>
        );
    }
}
