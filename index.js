var login = require("facebook-chat-api");

var except = {};
var answeredThreads = {};

login({
    email: "minhducvt12@gmail.com",
    password: "ducprofacebook" },
    function callback(err, api) {
    if(err) return console.error(err);
    api.listen(function callback(err, message) {
        console.log(message.threadID);

      
       if (except.hasOwnProperty(message.threadID) || message.senderID==="nhập ID facebook của người đó") {
           console.log("FormID: " + message.threadID + '->Message: '+message.body);
           return;
       }

       else if(message.body === "STOP") {
            console.log("FormID: " + message.threadID + '->Message: '+message.body);
            api.sendMessage("Ngừng trả lời tự động thành công", message.threadID);
            except[message.threadID] = true;
            return;
        }

       
        else if(message.body === "STOPALL") {
			api.sendMessage(";) Ngừng auto chat thành công.", message.threadID);
			api.markAsRead(message.threadID);
			return api.logout(err);
		}

       
        else if (message.senderID==="100004241474260" && !answeredThreads.hasOwnProperty(message.threadID)) {
            console.log("FormID: " + message.threadID + '->Message: '+message.body); //Xuất thông tin trên console, không cần quan tâm
            answeredThreads[message.threadID] = true;
			api.sendMessage("Chào Quân, t đang ko online t sẽ trả lời m khi online", message.threadID);
			return;
		}

       
        if(!answeredThreads.hasOwnProperty(message.threadID)){
            console.log("FormID: " + message.threadID + '->Message: '+message.body);
            answeredThreads[message.threadID] = true;
            api.sendMessage("Chào, hiện tại mình Không online, mình sẽ trả lời bạn ngay khi online", message.threadID);
            return;
        }
    });
});
/// OK save

/*

else if(answeredThreads.hasOwnProperty(message.threadID)){
    console.log("FormID: " + message.threadID + '->Message: '+message.body);
    api.sendMessage("Đây là tin nhắn hệ thống, đừng spam nữa nhé.\nNếu muốn dừng việc trả lời tự động, hãy gửi STOP. Cảm ơn", message.threadID);
    return;
}

Nếu muốn đánh dấu là đã đọc
    api.markAsRead(message.threadID);

*/
