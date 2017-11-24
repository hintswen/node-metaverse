// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectClickActionPacket implements Packet
{
    name = 'ObjectClickAction';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901855;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ObjectLocalID: number;
        ClickAction: number;
    }[];

    getSize(): number
    {
        return ((5) * this.ObjectData.length) + 33;
    }

}