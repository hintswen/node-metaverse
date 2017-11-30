// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ParcelGodForceOwnerMessage implements MessageBase
{
    name = 'ParcelGodForceOwner';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.ParcelGodForceOwner;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        OwnerID: UUID;
        LocalID: number;
    };

    getSize(): number
    {
        return 52;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['OwnerID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.Data['LocalID'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjData: {
            OwnerID: UUID,
            LocalID: number
        } = {
            OwnerID: UUID.zero(),
            LocalID: 0
        };
        newObjData['OwnerID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['LocalID'] = buf.readInt32LE(pos);
        pos += 4;
        this.Data = newObjData;
        return pos - startPos;
    }
}
