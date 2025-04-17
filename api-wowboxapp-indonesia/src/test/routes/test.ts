import { Body, Controller, Get, JsonController, Post, QueryParam, QueryParams, Req, Res } from "routing-controllers";
import { CoreController } from "../../common/core/CoreController";
import * as fs from 'fs';




// const {Translate} = require('@google-cloud/translate').v2;
// const translate = new Translate({
//     projectId:'orbital-outpost-398201',
//     key: 'AIzaSyBbe0l_I2ug51v63p0xCY0j2sep_IoaTt8', 
// });

const {Translate} = require('@google-cloud/translate').v2;
// const translate = new Translate({
//     projectId:'fourth-carport-410800',
//     key: 'AIzaSyCPzSQS5F8yKn7f4jnquUP-3-Ic7zFRqz4', 
// });
const translate = new Translate({
    projectId:'modular-gantry-412906',
    key: 'AIzaSyCsLbWgBUB-u59spfZ0bFmkkurfuRWIOW0', 
});

const strArr = {
    "word_total_benfit":"Total Dividend Income",
"word_retention_buff":"BUFF",
"word_daily_benefit":"Daily Earnings",
"word_calculate_history":"Settlement Details",
"msg_daily_benefit_desc1":"According to the BUFF ratio held by you, BUFLEXZ Lucky Draw proceeds will be accumulated every day according to the BUFF ratio every day.",
"msg_daily_benefit_desc2":"Profits $10,000 / My Holding Ratio 10% = $1,000",
"msg_calculate_history_desc1":"You can receive dividend income for the previous month every month. It will be settled with the coin wallet you set up when participating in the dividend, and if the monthly settlement amount is less than $10, it will be automatically carried over to next month.",
"msg_benefit_history_not_exist":"No dividend income exists within the search period.",
"word_search":"Search",
"msg_input_startday_before_endday":"Please enter the start date as before the end date.",
"msg_input_endday_after_startday":"Please enter the end date after the start date.",
"word_date":"Date",
"word_total_proceeds":"Total Proceeds",
"word_my_benefit":"My Dividend Income",
"word_status":"State",
"word_profit_pending":"Settlement",
"msg_mining_desc":"BUFF, try mining it like this!",
"msg_mining1_desc1":"CoinStore Commemorates New Listing",
"msg_mining1_desc2":"BUFF Airdrop",
"msg_mining1_desc3":"500,000 BUFF in total",
"msg_mining1_desc4":"•100% Payment",
"msg_mining1_desc5":"•Up to 10,000 BUFF per person",
"msg_mining1_desc6":"•BUFF will be sent to your meta-mask wallet.",
"msg_mining2_desc1":"BUFF Attendance Mining",
"msg_mining2_desc2":"BUFF payment worth 1USD upon attendance on the 30th",
"msg_mining2_desc3":"•Points will be earned at random during your daily attendance.",
"msg_mining2_desc4":"•If you attend on the 30th, you will be paid BUFF worth USD1.",
"msg_mining3_desc1":"BUFF Invitational Mining",
"msg_mining3_desc2":"BUFF payments worth ##USD2 for every 5 invite",
"msg_mining3_desc3":"•You must enter the recommended code to apply when registering as a member.",
"word_invite_mining_history":"Invitational mining history",
"msg_mining4_desc1":"BUFF Guerrilla Mining",
"msg_mining4_desc2":"Get BUFF on a first-come, first-served basis.",
"msg_mining5_desc1":"BUFF Advertising Mining",
"msg_mining5_desc2":"Until reset",
"msg_mining5_desc3":"•If you look at the step-by-step advertisement, you'll get a random score of CONTEST Ticket, Point, and BUFF.",
"msg_airdrop":"BUFF Airdrop",
"msg_mining":"BUFF Mining",
"msg_attendance_desc1":"Recent attendance dates",
"msg_attendance_desc2":"Next attendance check is available 24 hours after the time of attendance check",
"msg_attendance_desc3":"You have to press the [Attendance] button to check attendance.",
"msg_attendance_desc4":"Points will be randomly earned at the time of attendance every day.",
"msg_attendance_desc5":"If you attend on the 30th, you will be paid BUFF worth USD1.",
"msg_attendance_desc6":"When attendance is completed on the 30th, it will start again on the 1st.",
"word_attendance":"Attendance",
"word_attendance_complete":"Attendance completed",
"msg_not_eanble_attendance_time":"It's not attendable time.",
"format_attendance_complete":"%1$s-day attendance completed",
"word_save_point":"Earn points",
"word_save_buff":"Earn BUFF",
"word_save_ticket":" Earn CONTEST Ticket",
"word_invite_mining_buff_amount":"Invitational mining BUFF quantity",
"msg_buff_air_drop_desc1":"To commemorate the listing of BUFF Coin Store, we present BUFF as an airdrop to more people to understand and join BUFF.",
"msg_buff_air_drop_desc2":"For the wallet address, you must enter the Metamask BUFF wallet address, and we will not be responsible for any disadvantages caused by the identification of the wallet address you entered.",
"word_event_period":"Event Period",
"word_air_drop":"Airdrop",
"word_join_method":"How to participate",
"word_meta_mask_join_method":"How to join a Metamask",
"word_meta_mask_copy_address_method":"How to copy a Metamask wallet address",
"msg_view_guide_video":"View Guide Video",
"msg_buff_token_address":"BUFF Token Contract Address",
"msg_my_meta_mask_address":"My Metamask Wallet Address",
"msg_buff_air_drop_event_period_desc1":"Event progression",
"msg_buff_air_drop_event_period_desc2":"Full-time progression",
"msg_buff_air_drop_event_period_desc3":"Airdrop payment",
"msg_buff_air_drop_event_period_desc4":"Scheduled to be paid sequentially from the date of application",
"msg_buff_air_drop_air_drop_desc1":"500,000 BUFF in total",
"msg_buff_air_drop_air_drop_desc2":"Up to 10,000 BUFF per person",
"msg_buff_air_drop_air_drop_desc3":"BUFF coin quantities are randomly paid for each individual.",
"msg_buff_air_drop_air_drop_desc4":"Airdrop participants are 100% guaranteed to be paid.",
"msg_buff_air_drop_join_method_desc1":"Enter the address of the Metamask BUFF wallet to receive the airdrop.",
"msg_buff_air_drop_join_method_desc2":"[Apply for airdrop] Press the button.",
"msg_buff_air_drop_join_method_desc3":"Metamask is sent sequentially to BUFF wallet.",
"msg_buff_air_drop_token_address_desc1":"Please enter the address below when adding the Metamask token.",
"msg_buff_air_drop_meta_mask_address_desc1":"Please enter the copied address of my Metamask BUFF wallet.",
"msg_buff_air_drop_pending_desc1":"Checking the address of the Metamask wallet.",
"msg_buff_air_drop_pending_desc2":"It may take about three days based on the application date.",
"msg_buff_air_drop_return_desc1":"The airdrop application has been rejected.",
"msg_buff_air_drop_normal_desc1":"BUFF AirDrop Complete",
"msg_alert_apply_air_drop":"Would you like to apply for an airdrop to the Metamask wallet address you entered?",
"msg_input_meta_mask_address":"Please enter the address of the Metamask wallet.",
"msg_dupliate_meta_mask_address":"Metamask wallet address that already exists.",
"msg_alert_air_drop_return_desc":"Please re-apply after checking the reason for rejection.",
"word_apply_buff_air_drop":"Apply for airdrop",
"msg_input_private_number":"Please enter your participation number.",
"word_input_private_number":"Enter participation number",
"msg_lucky_draw_check_private_desc":"(Guerrilla Mining participation number will be provided on BUFF's official channel.)",
"msg_not_exist_complete_lucky_draw":"No events have been terminated.",
"msg_buff_guerrilla_join_desc1":"BUFF official Telegram and Discord will randomly guide you to Guerrilla Mining participation numbers.",
"msg_buff_guerrilla_join_desc2":"After running the BUFLEXZ App, enter the applicable Guerrilla Mining Lucky Draw Participation Number.",
"msg_buff_guerrilla_join_desc3":"Participants in Guerrilla Mining will be 100% won and BUFF will be paid as prize money.",
"msg_buff_guerrilla_caution_desc1":"Guerrilla Mining First come, first served number and winning BUFF number may vary each time.",
"msg_buff_guerrilla_caution_desc2":"The winning BUFF will be sent to BUFLEXZ wallet."
}

const langArr: any = [
{name: "af",},
{name: "sq"},
{name: "am",},
{name: "ar",},
{name: "as",},
{name: "az",},
{name: "be",},
{name: "bg",},
{name: "bn",},
{name: "bs",},
{name: "ca",},
{name: "zh-CN"},
{name: "co",},
{name: "cs",},
{name: "ceb"},
{name: "cy",},
{name: "da",},
{name: "de",},
{name: "el",},
{name: "eo",},
{name: "es",},
{name: "et",},
{name: "eu",},
{name: "fa",},
{name: "fi",},
{name: "fr",},
{name: "fy",},
{name: "ga",},
{name: "gd",},
{name: "gl",},
{name: "gn",},
{name: "gu",},
{name: "ha",},
{name: "he",},
{name: "hi",},
{name: "hmn"},
{name: "hr",},
{name: "ht",},
{name: "hu",},
{name: "haw"},
{name: "hy",},
{name: "id",},
{name: "ig",},
{name: "in",},
{name: "is",},
{name: "it",},
{name: "ja",},
{name: "jw"},
{name: "ka",},
{name: "km"},
{name: "kk",},
{name: "kn",},
{name: "ku",},
{name: "ky",},
{name: "lb",},
{name: "lo",},
{name: "lt",},
{name: "lv",},
{name: "mg",},
{name: "mi",},
{name: "mk",},
{name: "ml",},
{name: "mn",},
{name: "mr",},
{name: "ms",},
{name: "mt",},
{name: "my",},
{name: "no"},
{name: "ne",},
{name: "nl",},
{name: "ny",},
{name: "or",},
{name: "pa",},
{name: "pl",},
{name: "ps",},
{name: "pt",},
{name: "ro",},
{name: "sr"},
{name: "ru",},
{name: "rw",},
{name: "sd",},
{name: "si",},
{name: "sk",},
{name: "sl",},
{name: "sm",},
{name: "sn",},
{name: "so",},
{name: "st",},
{name: "su",},
{name: "sv",},
{name: "sw",},
{name: "ta",},
{name: "te",},
{name: "tg",},
{name: "th",},
{name: "tk",},
{name: "tr",},
{name: "tt",},
{name: "ug",},
{name: "uk",},
{name: "ur",},
{name: "uz",},
{name: "vi"},
{name: "xh",},
{name: "yi",},
{name: "yo",},
{name: "zh-TW"},
{name: "zu"},

]

@Controller('/test')
export class TestController extends CoreController {


    @Post('/iosCreate')
    public async iosCreate(@Req() req, @Body() params) {

        let index = 1;
        for(let lang of langArr) {

            var name = lang.convert ? lang.convert : lang.name;
            let path = `Users/imac/dev/translation/ios/${name}.lproj/Localizable.strings`;
            this.createFile(path);
            for(let data in strArr) {
                const [translation] = await translate.translate(strArr[data], lang.name);
                fs.appendFileSync('/'+path, `"${data}" = "${translation}";\n`);

            }

            console.log(index + '/' + langArr.length + '    '+ lang.name +' END');
            index++;
        }


        return true;

    }

    @Post('/create')
    public async create(@Req() req, @Body() params) {

        let index = 1;
        for(let lang of langArr) {

            var name = lang.convert ? lang.convert : lang.name;
            if(name == 'he'){
                name = 'iw';
            }else if(name == 'zh-TW'){
                name == 'zh-rTW'
            }else if(name == 'zh-CN'){
                name == 'zh-rCN'
            }

            let path = `Users/imac/dev/translation/aos/values-${name}/strings.xml`;
            this.createFile(path);
            // fs.appendFileSync(path, `<resources>\n`);
            for(let data in strArr) {
                const [translation] = await translate.translate(strArr[data], lang.name);
                fs.appendFileSync('/'+path, `   <string name="${data}">${translation}</string>\n`);

            }
            fs.appendFileSync('/'+path, `</resources>\n`);

            console.log(index + '/' + langArr.length + '    '+ lang.name +' END');
            index++;
        }


        return true;

    }

    @Post('/create2')
    public async create2(@Req() req, @Body() params) {

        let index = 1;
        for(let lang of langArr) {

            var name = lang.convert ? lang.convert : lang.name;
            if(name == 'he'){
                name = 'iw';
            }
            let path = `Users/imac/dev/translation/server/${name}.json`;
            this.createFile(path);
            fs.appendFileSync('/'+path, `{\n`);
            for(let data in strArr) {
                const [translation] = await translate.translate(strArr[data], lang.name);
                
                if(data == 'authMailContents5'){
                    fs.appendFileSync('/'+path, `"${data}":"${translation}"\n`);
                }else{
                    fs.appendFileSync('/'+path, `"${data}":"${translation}",\n`);
                }

            }
            fs.appendFileSync('/'+path, `}\n`);

            console.log(index + '/' + langArr.length + '    '+ lang.name +' END');
            index++;
        }

        return true;
        
    }

    public createFile(fullPath: string) {

        // fullPath = fullPath.replace('c://', '');
        let pathArr = fullPath.split('/');

        let path = '';
        for(let data of pathArr) {
            if(!fs.existsSync(path + '/' + data)) {
                if(data.indexOf('.xml') > 0 || data.indexOf('.json') > 0 || data.indexOf('.strings') > 0) {
                    fs.writeFileSync(path + '/' + data, '');
                } else {
                    fs.mkdirSync(path + '/' + data);
                }
            }
            path = path + '/' + data;
        }

        return path;

    }

}
