//% color=#EC1313 weight=91 icon="\uf19c" block="LU-Bit"
namespace luBit {
    //% block="Init RC-Controller"
    //% weight=100
    //% group="LU_Drone"
    export function RC_Controller_Init(): void {
        serial.redirect(
        SerialPin.P16,
        SerialPin.P8,
        BaudRate.BaudRate115200
        )
    }



    //% block="Control throttle=$throttle pitch=$pitch roll=$roll yaw=$yaw"
    //% weight=90
    //% group="LU_Drone"
    export function sendRC_Control(throttle: number, pitch: number, roll: number, yaw: number): void {
        serial.writeNumber(170)
    }



    //% block="Order order=$order data=$data"
    //% weight=80
    //% group="LU_Drone"
    export function sendRC_Order(order: number, data: number): void {
        serial.writeNumber(1)
    }

}
