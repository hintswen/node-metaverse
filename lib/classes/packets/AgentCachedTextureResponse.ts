// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class AgentCachedTextureResponsePacket implements Packet
{
    name = 'AgentCachedTextureResponse';
    flags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = 4294902145;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        SerialNum: number;
    };
    WearableData: {
        TextureID: UUID;
        TextureIndex: number;
        HostName: string;
    }[];

    getSize(): number
    {
        return ((this.calculateVarVarSize(this.WearableData, 'HostName', 1) + 17) * this.WearableData.length) + 37;
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

}