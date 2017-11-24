// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class MapItemRequestPacket implements Packet
{
    name = 'MapItemRequest';
    flags = MessageFlags.FrequencyLow;
    id = 4294902170;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        Flags: number;
        EstateID: number;
        Godlike: boolean;
    };
    RequestData: {
        ItemType: number;
        RegionHandle: Long;
    };

    getSize(): number
    {
        return 53;
    }

}