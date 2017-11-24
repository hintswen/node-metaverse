// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectSpinStopPacket implements Packet
{
    name = 'ObjectSpinStop';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901882;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ObjectID: UUID;
    };

    getSize(): number
    {
        return 48;
    }

}