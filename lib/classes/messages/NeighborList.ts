// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {IPAddress} from '../IPAddress';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class NeighborListMessage implements MessageBase
{
    name = 'NeighborList';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyHigh;
    id = Message.NeighborList;

    NeighborBlock: {
        IP: IPAddress;
        Port: number;
        PublicIP: IPAddress;
        PublicPort: number;
        RegionID: UUID;
        Name: Buffer;
        SimAccess: number;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.NeighborBlock, 'Name', 1)) * 4) + 116;
    }

    calculateVarVarSize(block: object[], paramName: string, extraPerVar: number): number
    {
        let size = 0;
        block.forEach((bl: any) =>
        {
            size += bl[paramName].length + extraPerVar;
        });
        return size;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        const count = 4;
        for (let i = 0; i < count; i++)
        {
            this.NeighborBlock[i]['IP'].writeToBuffer(buf, pos);
            pos += 4;
            buf.writeUInt16LE(this.NeighborBlock[i]['Port'], pos);
            pos += 2;
            this.NeighborBlock[i]['PublicIP'].writeToBuffer(buf, pos);
            pos += 4;
            buf.writeUInt16LE(this.NeighborBlock[i]['PublicPort'], pos);
            pos += 2;
            this.NeighborBlock[i]['RegionID'].writeToBuffer(buf, pos);
            pos += 16;
            buf.writeUInt8(this.NeighborBlock[i]['Name'].length, pos++);
            this.NeighborBlock[i]['Name'].copy(buf, pos);
            pos += this.NeighborBlock[i]['Name'].length;
            buf.writeUInt8(this.NeighborBlock[i]['SimAccess'], pos++);
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const count = 4;
        this.NeighborBlock = [];        for (let i = 0; i < count; i++)
        {
            const newObjNeighborBlock: {
                IP: IPAddress,
                Port: number,
                PublicIP: IPAddress,
                PublicPort: number,
                RegionID: UUID,
                Name: Buffer,
                SimAccess: number
            } = {
                IP: IPAddress.zero(),
                Port: 0,
                PublicIP: IPAddress.zero(),
                PublicPort: 0,
                RegionID: UUID.zero(),
                Name: Buffer.allocUnsafe(0),
                SimAccess: 0
            };
            newObjNeighborBlock['IP'] = new IPAddress(buf, pos);
            pos += 4;
            newObjNeighborBlock['Port'] = buf.readUInt16LE(pos);
            pos += 2;
            newObjNeighborBlock['PublicIP'] = new IPAddress(buf, pos);
            pos += 4;
            newObjNeighborBlock['PublicPort'] = buf.readUInt16LE(pos);
            pos += 2;
            newObjNeighborBlock['RegionID'] = new UUID(buf, pos);
            pos += 16;
            varLength = buf.readUInt8(pos++);
            newObjNeighborBlock['Name'] = buf.slice(pos, pos + varLength);
            pos += varLength;
            newObjNeighborBlock['SimAccess'] = buf.readUInt8(pos++);
            this.NeighborBlock.push(newObjNeighborBlock);
        }
        return pos - startPos;
    }
}
