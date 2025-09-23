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
    // 转换为16位有符号整数
    let intThrottle = (throttle << 16) >> 16;
    let intPitch = (pitch << 16) >> 16;
    let intRoll = (roll << 16) >> 16;
    let intYaw = (yaw << 16) >> 16;
    let intCheck = 0;

    // 创建缓冲区（12字节：1个起始字节 + 1个数据包类型 + 8个数据字节 + 1个校检字节 + 1个结束字节）
    let buffer = control.createBuffer(12);
    let index = 0;
    
    // 设置起始标志
    buffer[index++] = 0xA5;

    //表示这是RC控制数据
    buffer[index++] = 0x00;
    
    // 设置throttle的2个字节（小端序）
    buffer[index++] = intThrottle & 0xFF;
    buffer[index++] = (intThrottle >> 8) & 0xFF;

    // 设置pitch的2个字节（小端序）
    buffer[index++] = intPitch & 0xFF;
    buffer[index++] = (intPitch >> 8) & 0xFF;

    // 设置roll的2个字节（小端序）
    buffer[index++] = intRoll & 0xFF;
    buffer[index++] = (intRoll >> 8) & 0xFF;

    // 设置yaw的2个字节（小端序）
    buffer[index++] = intYaw & 0xFF;
    buffer[index++] = (intYaw >> 8) & 0xFF;


    // 设置校检的1个字节（小端序）
    intCheck = (intThrottle + intPitch + intRoll + intYaw) & 0xFF;
    buffer[index++] = intCheck;

    // 设置结束标志
    buffer[index++] = 0x5A;
    
    // 发送二进制数据
    serial.writeBuffer(buffer);

    }



    //% block="Send order=$order"
    //% weight=80
    //% group="LU_Drone"
    //% order.defl=DroneOrder.TakeOff
    export function sendRC_Order(order: DroneOrder): void {
    // 创建缓冲区（12字节：1个起始字节 + 1个数据包类型 + 8个数据字节 + 1个校检字节 + 1个结束字节）
    let buffer = control.createBuffer(12);
    let index = 0;
    
    // 设置起始标志
    buffer[index++] = 0xA5;

    //表示这是RC命令数据
    buffer[index++] = 0x01;
    
    // 设置指令（uint16，小端序）
    buffer[index++] = order & 0xFF;        // 低字节
    buffer[index++] = (order >> 8) & 0xFF; // 高字节

    buffer[index++] = 0;
    buffer[index++] = 0;
    buffer[index++] = 0;
    buffer[index++] = 0;
    buffer[index++] = 0;
    buffer[index++] = 0;


    // 设置校检的1个字节（小端序）
    buffer[index++] = (order) & 0xFF;;

    // 设置结束标志
    buffer[index++] = 0x5A;
    
    // 发送二进制数据
    serial.writeBuffer(buffer);

    }

}
