// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ImageNotInDatabaseMessage implements MessageBase
{
    name = 'ImageNotInDatabase';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.ImageNotInDatabase;

    ImageID: {
        ID: UUID;
    };

    getSize(): number
    {
        return 16;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.ImageID['ID'].writeToBuffer(buf, pos);
        pos += 16;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjImageID: {
            ID: UUID
        } = {
            ID: UUID.zero()
        };
        newObjImageID['ID'] = new UUID(buf, pos);
        pos += 16;
        this.ImageID = newObjImageID;
        return pos - startPos;
    }
}
