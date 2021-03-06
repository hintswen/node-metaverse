// This file has been automatically generated by writeMessageClasses.js

import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ViewerFrozenMessageMessage implements MessageBase
{
    name = 'ViewerFrozenMessage';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ViewerFrozenMessage;

    FrozenData: {
        Data: boolean;
    };

    getSize(): number
    {
        return 1;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8((this.FrozenData['Data']) ? 1 : 0, pos++);
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjFrozenData: {
            Data: boolean
        } = {
            Data: false
        };
        newObjFrozenData['Data'] = (buf.readUInt8(pos++) === 1);
        this.FrozenData = newObjFrozenData;
        return pos - startPos;
    }
}

