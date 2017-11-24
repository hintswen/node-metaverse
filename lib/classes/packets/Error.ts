// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ErrorPacket implements Packet
{
    name = 'Error';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902183;

    AgentData: {
        AgentID: UUID;
    };
    Data: {
        Code: number;
        Token: string;
        ID: UUID;
        System: string;
        Message: string;
        Data: string;
    };

    getSize(): number
    {
        return (this.Data['Token'].length + 1 + this.Data['System'].length + 1 + this.Data['Message'].length + 2 + this.Data['Data'].length + 2) + 36;
    }

}