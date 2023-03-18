const mongoose = require("mongoose");
var deepPopulate = require("mongoose-deep-populate")(mongoose);

const schema = mongoose.Schema;



const IncomingSchema = new schema(
    {
        // serialNumber: { type: Number, unique: true, required: true, dropDups: true },
        serialNumber: { type: Number},
        year: Number,
        date: { type: Date, default: Date.now },
        messageNumber: Number,
        sender: { type: schema.Types.ObjectId, ref: "senderschema" },
        conclusion: String,
        sequentialDate: { type: Date, default: Date.now },
        result: String,
        sendTo: String
    }
)

const SendersSchema = new schema({
    name: String
});

module.exports.IncomingSchema = mongoose.model("incomingschema", IncomingSchema);
module.exports.SendersSchema = mongoose.model("senderschema", SendersSchema);


