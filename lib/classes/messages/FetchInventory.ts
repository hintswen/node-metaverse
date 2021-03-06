// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class FetchInventoryMessage implements MessageBase
{
    name = 'FetchInventory';
    messageFlags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.FetchInventory;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    InventoryData: {
        OwnerID: UUID;
        ItemID: UUID;
    }[];

    getSize(): number
    {
        return ((32) * this.InventoryData.length) + 33;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        const count = this.InventoryData.length;
        buf.writeUInt8(this.InventoryData.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.InventoryData[i]['OwnerID'].writeToBuffer(buf, pos);
            pos += 16;
            this.InventoryData[i]['ItemID'].writeToBuffer(buf, pos);
            pos += 16;
        }
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
        const count = buf.readUInt8(pos++);
        this.InventoryData = [];
        for (let i = 0; i < count; i++)
        {
            const newObjInventoryData: {
                OwnerID: UUID,
                ItemID: UUID
            } = {
                OwnerID: UUID.zero(),
                ItemID: UUID.zero()
            };
            newObjInventoryData['OwnerID'] = new UUID(buf, pos);
            pos += 16;
            newObjInventoryData['ItemID'] = new UUID(buf, pos);
            pos += 16;
            this.InventoryData.push(newObjInventoryData);
        }
        return pos - startPos;
    }
}

