import {CommandsBase} from './CommandsBase';
import {UUID} from '../UUID';
import {Utils} from '../Utils';
import {ImprovedInstantMessageMessage} from '../messages/ImprovedInstantMessage';
import {Vector3} from '../Vector3';
import {ChatFromViewerMessage} from '../messages/ChatFromViewer';
import {ChatType} from '../../enums/ChatType';
import {InstantMessageDialog} from '../../enums/InstantMessageDialog';
import Timer = NodeJS.Timer;
import {GroupChatSessionJoinEvent, PacketFlags, ScriptDialogEvent} from '../..';
import {ScriptDialogReplyMessage} from '../messages/ScriptDialogReply';

export class CommunicationsCommands extends CommandsBase
{
    async sendInstantMessage(to: UUID | string, message: string): Promise<void>
    {
        const circuit = this.circuit;
        if (typeof to === 'string')
        {
            to = new UUID(to);
        }
        const agentName = this.agent.firstName + ' ' + this.agent.lastName;
        const im: ImprovedInstantMessageMessage = new ImprovedInstantMessageMessage();
        im.AgentData = {
            AgentID: this.agent.agentID,
            SessionID: circuit.sessionID
        };
        im.MessageBlock = {
            FromGroup: false,
            ToAgentID: to,
            ParentEstateID: 0,
            RegionID: UUID.zero(),
            Position: Vector3.getZero(),
            Offline: 1,
            Dialog: 0,
            ID: UUID.zero(),
            Timestamp: Math.floor(new Date().getTime() / 1000),
            FromAgentName: Utils.StringToBuffer(agentName),
            Message: Utils.StringToBuffer(message),
            BinaryBucket: Buffer.allocUnsafe(0)
        };
        im.EstateBlock = {
            EstateID: 0
        };
        const sequenceNo = circuit.sendMessage(im, PacketFlags.Reliable);
        return await circuit.waitForAck(sequenceNo, 10000);
    }

    async nearbyChat(message: string, type: ChatType, channel?: number): Promise<void>
    {
        if (channel === undefined)
        {
            channel = 0;
        }
        const cfv = new ChatFromViewerMessage();
        cfv.AgentData = {
            AgentID: this.agent.agentID,
            SessionID: this.circuit.sessionID
        };
        cfv.ChatData = {
            Message: Utils.StringToBuffer(message),
            Type: type,
            Channel: channel
        };
        const sequenceNo = this.circuit.sendMessage(cfv, PacketFlags.Reliable);
        return await this.circuit.waitForAck(sequenceNo, 10000);
    }

    async say(message: string, channel?: number): Promise<void>
    {
        return await this.nearbyChat(message, ChatType.Normal, channel);
    }

    async whisper(message: string, channel?: number): Promise<void>
    {
        return await this.nearbyChat(message, ChatType.Whisper, channel);
    }

    async shout(message: string, channel?: number): Promise<void>
    {
        return await this.nearbyChat(message, ChatType.Shout, channel);
    }

    async startTypingLocal(): Promise<void>
    {
        const cfv = new ChatFromViewerMessage();
        cfv.AgentData = {
            AgentID: this.agent.agentID,
            SessionID: this.circuit.sessionID
        };
        cfv.ChatData = {
            Message: Buffer.allocUnsafe(0),
            Type: ChatType.StartTyping,
            Channel: 0
        };
        const sequenceNo = this.circuit.sendMessage(cfv, PacketFlags.Reliable);
        return await this.circuit.waitForAck(sequenceNo, 10000);
    }

    async stopTypingLocal(): Promise<void>
    {
        const cfv = new ChatFromViewerMessage();
        cfv.AgentData = {
            AgentID: this.agent.agentID,
            SessionID: this.circuit.sessionID
        };
        cfv.ChatData = {
            Message: Buffer.allocUnsafe(0),
            Type: ChatType.StopTyping,
            Channel: 0
        };
        const sequenceNo = this.circuit.sendMessage(cfv, PacketFlags.Reliable);
        return await this.circuit.waitForAck(sequenceNo, 10000);
    }

    async startTypingIM(to: UUID | string): Promise<void>
    {
        if (typeof to === 'string')
        {
            to = new UUID(to);
        }
        const circuit = this.circuit;
        const agentName = this.agent.firstName + ' ' + this.agent.lastName;
        const im: ImprovedInstantMessageMessage = new ImprovedInstantMessageMessage();
        im.AgentData = {
            AgentID: this.agent.agentID,
            SessionID: circuit.sessionID
        };
        im.MessageBlock = {
            FromGroup: false,
            ToAgentID: to,
            ParentEstateID: 0,
            RegionID: UUID.zero(),
            Position: Vector3.getZero(),
            Offline: 0,
            Dialog: InstantMessageDialog.StartTyping,
            ID: UUID.zero(),
            Timestamp: Math.floor(new Date().getTime() / 1000),
            FromAgentName: Utils.StringToBuffer(agentName),
            Message: Utils.StringToBuffer(''),
            BinaryBucket: Buffer.allocUnsafe(0)
        };
        im.EstateBlock = {
            EstateID: 0
        };
        const sequenceNo = circuit.sendMessage(im, PacketFlags.Reliable);
        return await circuit.waitForAck(sequenceNo, 10000);
    }

    async stopTypingIM(to: UUID | string): Promise<void>
    {
        if (typeof to === 'string')
        {
            to = new UUID(to);
        }
        const circuit = this.circuit;
        const agentName = this.agent.firstName + ' ' + this.agent.lastName;
        const im: ImprovedInstantMessageMessage = new ImprovedInstantMessageMessage();
        im.AgentData = {
            AgentID: this.agent.agentID,
            SessionID: circuit.sessionID
        };
        im.MessageBlock = {
            FromGroup: false,
            ToAgentID: to,
            ParentEstateID: 0,
            RegionID: UUID.zero(),
            Position: Vector3.getZero(),
            Offline: 0,
            Dialog: InstantMessageDialog.StopTyping,
            ID: UUID.zero(),
            Timestamp: Math.floor(new Date().getTime() / 1000),
            FromAgentName: Utils.StringToBuffer(agentName),
            Message: Utils.StringToBuffer(''),
            BinaryBucket: Buffer.allocUnsafe(0)
        };
        im.EstateBlock = {
            EstateID: 0
        };
        const sequenceNo = circuit.sendMessage(im, PacketFlags.Reliable);
        return await circuit.waitForAck(sequenceNo, 10000);
    }

    typeInstantMessage(to: UUID | string, message: string, thinkingTime?: number, charactersPerSecond?: number): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            if (thinkingTime === undefined)
            {
                thinkingTime = 2000;
            }
            setTimeout(() =>
            {
                if (typeof to === 'string')
                {
                    to = new UUID(to);
                }
                let typeTimer: Timer | null = null;
                this.startTypingIM(to).then(() =>
                {
                    typeTimer = setInterval(() =>
                    {
                        this.startTypingIM(to).catch(() =>
                        {
                            // ignore
                        });
                    }, 5000);
                    if (charactersPerSecond === undefined)
                    {
                        charactersPerSecond = 5;
                    }

                    const timeToWait = (message.length / charactersPerSecond) * 1000;
                    setTimeout(() =>
                    {
                        if (typeTimer !== null)
                        {
                            clearInterval(typeTimer);
                            typeTimer = null;
                        }
                        this.stopTypingIM(to).then(() =>
                        {
                            this.sendInstantMessage(to, message).then(() =>
                            {
                                resolve();
                            }).catch((err) =>
                            {
                                reject(err);
                            });
                        }).catch((err) =>
                        {
                            reject(err);
                        });
                    }, timeToWait);
                }).catch((err) =>
                {
                    if (typeTimer !== null)
                    {
                        clearInterval(typeTimer);
                        typeTimer = null;
                    }
                    reject(err);
                });
            }, thinkingTime);
        });
    }

    typeLocalMessage(message: string, thinkingTime?: number, charactersPerSecond?: number): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            if (thinkingTime === undefined)
            {
                thinkingTime = 0;
            }
            setTimeout(() =>
            {
                this.startTypingLocal().then(() =>
                {
                    this.bot.clientCommands.agent.startAnimations([new UUID('c541c47f-e0c0-058b-ad1a-d6ae3a4584d9')]).then(() =>
                    {
                        if (charactersPerSecond === undefined)
                        {
                            charactersPerSecond = 5;
                        }

                        const timeToWait = (message.length / charactersPerSecond) * 1000;
                        setTimeout(() =>
                        {
                            this.stopTypingLocal().then(() =>
                            {
                                this.bot.clientCommands.agent.stopAnimations([new UUID('c541c47f-e0c0-058b-ad1a-d6ae3a4584d9')]).then(() =>
                                {
                                    this.say(message).then(() =>
                                    {
                                        resolve();
                                    }).catch((err) =>
                                    {
                                        reject(err);
                                    });
                                }).catch((err) =>
                                {
                                    reject(err);
                                });
                            }).catch((err) =>
                            {
                                reject(err);
                            });
                        }, timeToWait);
                    }).catch((err) =>
                    {
                        reject(err);
                    });
                }).catch((err) =>
                {
                    reject(err);
                });
            }, thinkingTime);
        });
    }

    startGroupChatSession(sessionID: UUID | string, message: string): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            if (typeof sessionID === 'string')
            {
                sessionID = new UUID(sessionID);
            }
            if (this.agent.hasChatSession(sessionID))
            {
                resolve();
            }
            else
            {
                const circuit = this.circuit;
                const agentName = this.agent.firstName + ' ' + this.agent.lastName;
                const im: ImprovedInstantMessageMessage = new ImprovedInstantMessageMessage();
                im.AgentData = {
                    AgentID: this.agent.agentID,
                    SessionID: circuit.sessionID
                };
                im.MessageBlock = {
                    FromGroup: false,
                    ToAgentID: sessionID,
                    ParentEstateID: 0,
                    RegionID: UUID.zero(),
                    Position: Vector3.getZero(),
                    Offline: 0,
                    Dialog: InstantMessageDialog.SessionGroupStart,
                    ID: sessionID,
                    Timestamp: Math.floor(new Date().getTime() / 1000),
                    FromAgentName: Utils.StringToBuffer(agentName),
                    Message: Utils.StringToBuffer(message),
                    BinaryBucket: Utils.StringToBuffer('')
                };
                im.EstateBlock = {
                    EstateID: 0
                };
                const waitForJoin = this.currentRegion.clientEvents.onGroupChatSessionJoin.subscribe((event: GroupChatSessionJoinEvent) =>
                {
                    if (event.sessionID.toString() === sessionID.toString())
                    {
                        if (event.success)
                        {
                            waitForJoin.unsubscribe();

                            resolve();
                        }
                        else
                        {
                            reject();
                        }
                    }
                });
                const sequenceNo = circuit.sendMessage(im, PacketFlags.Reliable);
            }
        });
    }

    sendGroupMessage(groupID: UUID | string, message: string): Promise<number>
    {
        return new Promise<number>((resolve, reject) =>
        {
            this.startGroupChatSession(groupID, message).then(() =>
            {
                if (typeof groupID === 'string')
                {
                    groupID = new UUID(groupID);
                }
                const circuit = this.circuit;
                const agentName = this.agent.firstName + ' ' + this.agent.lastName;
                const im: ImprovedInstantMessageMessage = new ImprovedInstantMessageMessage();
                im.AgentData = {
                    AgentID: this.agent.agentID,
                    SessionID: circuit.sessionID
                };
                im.MessageBlock = {
                    FromGroup: false,
                    ToAgentID: groupID,
                    ParentEstateID: 0,
                    RegionID: UUID.zero(),
                    Position: Vector3.getZero(),
                    Offline: 0,
                    Dialog: InstantMessageDialog.SessionSend,
                    ID: groupID,
                    Timestamp: Math.floor(new Date().getTime() / 1000),
                    FromAgentName: Utils.StringToBuffer(agentName),
                    Message: Utils.StringToBuffer(message),
                    BinaryBucket: Utils.StringToBuffer('')
                };
                im.EstateBlock = {
                    EstateID: 0
                };
                const sequenceNo = circuit.sendMessage(im, PacketFlags.Reliable);
                return this.circuit.waitForAck(sequenceNo, 10000);
            }).then(() =>
            {
                resolve(this.bot.clientCommands.group.getSessionAgentCount(groupID))
            }).catch((err) =>
            {
                reject(err);
            });
        });
    }

    respondToScriptDialog(event: ScriptDialogEvent, buttonIndex: number): Promise<void>
    {
        const dialog: ScriptDialogReplyMessage = new ScriptDialogReplyMessage();
        dialog.AgentData = {
            AgentID: this.agent.agentID,
            SessionID: this.circuit.sessionID
        };
        dialog.Data = {
            ObjectID: event.ObjectID,
            ChatChannel: event.ChatChannel,
            ButtonIndex: buttonIndex,
            ButtonLabel: Utils.StringToBuffer(event.Buttons[buttonIndex])
        };
        const sequenceNo = this.circuit.sendMessage(dialog, PacketFlags.Reliable);
        return this.circuit.waitForAck(sequenceNo, 10000);
    }
}
