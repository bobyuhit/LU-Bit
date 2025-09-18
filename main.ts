//% color=#13ABEC weight=91 icon="\uf19c" block="LU-Bit"
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
        HoverOff = 6,
        //% block="打开投弹"
        DropBomb = 7,
        //% block="关闭投弹"
        DropBombOff = 8
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
    // 转换为32位整数
    let intThrottle = throttle | 0;
    let intPitch = pitch | 0;
    let intRoll = roll | 0;
    let intYaw = yaw | 0;
    
    // 创建缓冲区（20字节：2个起始字节 + 16个数据字节 + 2个结束字节）
    let buffer = control.createBuffer(20);
    let index = 0;
    
    // 设置起始标志
    buffer[index++] = 0xA5;
    buffer[index++] = 0x5A;
    
    // 设置throttle的4个字节（小端序）
    buffer[index++] = intThrottle & 0xFF;
    buffer[index++] = (intThrottle >> 8) & 0xFF;
    buffer[index++] = (intThrottle >> 16) & 0xFF;
    buffer[index++] = (intThrottle >> 24) & 0xFF;
    
    // 设置pitch的4个字节（小端序）
    buffer[index++] = intPitch & 0xFF;
    buffer[index++] = (intPitch >> 8) & 0xFF;
    buffer[index++] = (intPitch >> 16) & 0xFF;
    buffer[index++] = (intPitch >> 24) & 0xFF;
    
    // 设置roll的4个字节（小端序）
    buffer[index++] = intRoll & 0xFF;
    buffer[index++] = (intRoll >> 8) & 0xFF;
    buffer[index++] = (intRoll >> 16) & 0xFF;
    buffer[index++] = (intRoll >> 24) & 0xFF;
    
    // 设置yaw的4个字节（小端序）
    buffer[index++] = intYaw & 0xFF;
    buffer[index++] = (intYaw >> 8) & 0xFF;
    buffer[index++] = (intYaw >> 16) & 0xFF;
    buffer[index++] = (intYaw >> 24) & 0xFF;
    
    // 设置结束标志
    buffer[index++] = 0xAA;
    buffer[index++] = 0x55;
    
    // 发送二进制数据
    serial.writeBuffer(buffer);

    }



    //% block="Send order=$order"
    //% weight=80
    //% group="LU_Drone"
    //% order.defl=DroneOrder.TakeOff
    export function sendRC_Order(order: DroneOrder): void {
    let buffer = control.createBuffer(6);
    
    // 设置起始标志
    buffer[0] = 0x5A;
    buffer[1] = 0xA5;
    
    // 设置指令（uint16，小端序）
    buffer[2] = order & 0xFF;        // 低字节
    buffer[3] = (order >> 8) & 0xFF; // 高字节
    
    // 设置结束标志
    buffer[4] = 0x55;
    buffer[5] = 0xAA;
    
    // 发送二进制数据
    serial.writeBuffer(buffer);
    }

}
