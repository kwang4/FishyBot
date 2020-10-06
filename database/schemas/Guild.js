const mongoose = require('mongoose')

const GuildConfigSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    memberlist:{
        type:Array,
        required: true,
        default:[]
    },
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: '!'
    },
    settings:{
        type: Map,
        required: true,
        default: {"dadjokes":false}
    },
    warns:{
        type:Map,
        required: true,
        default:{}
    },
    usernames:{
        type:Map,
        required: true,
        default:{}
    },
    member_count_channel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    logging:{
        type:{
            webhook:{
                type:{
                    id:{
                        type:mongoose.SchemaTypes.String,
                        required: true
                    },
                    token:{
                        type:mongoose.SchemaTypes.String,
                        required: true
                    }
                },
                required: true
            },
            channel_id:{
                type: mongoose.SchemaTypes.String,
                required: true,
            }
        },
        required: false
    },
    joinMsg:{
        type:{
            channelId:{
                type: mongoose.SchemaTypes.String,
                required: true
            },
            color:{
                type: mongoose.SchemaTypes.String,
                required: false
            },
            title:{
                type: {
                    b:{
                        type: mongoose.SchemaTypes.String,
                        required: true
                    },
                    s:{
                        type: mongoose.SchemaTypes.String,
                        required: true
                    }
                },
                required: false
            },
            desc:{
                type: {
                    b:{
                        type: mongoose.SchemaTypes.String,
                        required: true
                    },
                    s:{
                        type: mongoose.SchemaTypes.String,
                        required: true
                    }
                },
                required: false
            },
            message:{
                type: String,
                required: false
            },
            dm:{
                type: String,
                required: false
            }

        },
        required: false
    },
    custom_commands:{
        type: Map,
        required: false
    },
    features:{
        type: Array,
        required: false
    }


})

module.exports = mongoose.model('GuildData', GuildConfigSchema);