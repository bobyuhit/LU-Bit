//% color=#EC1313 weight=91 icon="\uf19c" block="LU-Bit"
namespace luBit {
    export enum DroneOrder {
        //% block="起飞"
        TakeOff = 1,
        //% block="降落"
        Land = 2,
        //% block="紧急停机"
        EmergencyStop = 3,
        //% block="校准"
        Calibrate = 4,
        //% block="打开悬停"
        HoverOn = 5,
        //% block="关闭悬停"
        HoverOff = 6
    }

    //% block="Init Drone RC-Controller"
    //% weight=100
    //% group="LU_Drone"
    export function RC_Controller_Init(): void {
        serial.redirect(
        SerialPin.P16,
        SerialPin.P8,
        BaudRate.BaudRate115200
        )
    }

    //% block="Set throttle=$throttle pitch=$pitch roll=$roll yaw=$yaw"
    //% weight=90
    //% group="LU_Drone"
    export function sendRC_Control(throttle: number, pitch: number, roll: number, yaw: number): void {
        serial.writeNumber(170)
    }



    //% block="Send order=$order"
    //% weight=80
    //% group="LU_Drone"
    //% order.defl=DroneOrder.TakeOff
    export function sendRC_Order(order: DroneOrder): void {
        serial.writeNumber(order)
    }

}
