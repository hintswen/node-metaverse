// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ChatFromViewerMessage implements MessageBase
{
    name = 'ChatFromViewer';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.ChatFromViewer;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ChatData: {
        Message: Buffer;
        Type: number;
        Channel: number;
    };

    getSize(): number
    {
        return (this.ChatData['Message'].length + 2) + 37;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt16LE(this.ChatData['Message'].length, pos);
        pos += 2;
        this.ChatData['Message'].copy(buf, pos);
        pos += this.ChatData['Message'].length;
        buf.writeUInt8(this.ChatData['Type'], pos++);
        buf.writeInt32LE(this.ChatData['Channel'], pos);
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
        const newObjChatData: {
            Message: Buffer,
            Type: number,
            Channel: number
        } = {
            Message: Buffer.allocUnsafe(0),
            Type: 0,
            Channel: 0
        };
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjChatData['Message'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjChatData['Type'] = buf.readUInt8(pos++);
        newObjChatData['Channel'] = buf.readInt32LE(pos);
        pos += 4;
        this.ChatData = newObjChatData;
        return pos - startPos;
    }
}

