// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class CompleteAgentMovementPacket implements Packet
{
    name = 'CompleteAgentMovement';
    flags = MessageFlags.FrequencyLow;
    id = 4294902009;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
        CircuitCode: number;
    };

    getSize(): number
    {
        return 36;
    }

}