import * as moment from 'moment-timezone';
import { sha256 } from 'js-sha256';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { LANGUAGE } from '../../language';
import { CoreError } from '../core/CoreError';
import { E_INTERNAL_SERVER } from './errorType';

export function getRandomOrderId() {

	let onedigit = Number(getRandomNum(1, 0, 9));

	return moment().format('YYMMDDHHmmssSSS') + onedigit;
}

export function safeNumber(str: any) {
	if(!str) return 0;

	if(Number(str)) {
		return Number(str);
	} else {
		return 0;
	}
}

export function safeJoin(str: string[], delimiter: string) {
	let result: string = '';

	if(str) {
		if(Array.isArray(str)) {
			let sp: string[] = [];
			for(let i = 0;i < str.length; ++i) {
				if(str[i]) {
					sp.push(str[i]);
				}
			}

			result = sp.join(delimiter);
		}
		else {
			result = str;
		}
	}

	return result;
}

export function safeSplit(str: string, delimiter: string | RegExp) {
	let result: string[] = [];

	if(str) {
		let sp: string[] = str.split(delimiter);
		for(let i = 0; i < sp.length; ++i) {
			if(sp[i]) {
				result.push(sp[i]);
			}
		}
	}
	
	return result;
}

export function safeArray(arr: any): any[] {
	if(!arr) {
		return [];
	}
	if(Array.isArray(arr)) {
		return arr;
	}
	if(typeof arr !== 'string' && typeof arr.length === 'number') {
		return arr;
	}
	
	return [arr];
}

export function isNonEmptyArray(arr: any):boolean {
	return Array.isArray(arr) && arr.length > 0;
}

export function getRandomNum(length:number, min:number, max:number) {
	let result : string = '';

	for(let i:number=0; i < length; i++){
		result = result + (Math.floor(Math.random() * (max - min + 1)) + min)
	}

	return result;
}

/**
 * list에서 key에 해당하는 요소만을 뽑아서 새로운 array를 리턴한다.
 * @param list 
 * @param key 
 */
export function arrayObjectToValue<T = any>(list: any[], key: string) {
	let array: T[] = [];
	if(Array.isArray(list)) for(let one of list) {
		if(one[key]){
			array.push(one[key]);
		}
	}

	return array;
}

export function arrayToMap(arr, key) {
    let map = {};
    if(Array.isArray(arr)) {
        for(let i = 0; i < arr.length; ++i) {
            map[arr[i][key]] = arr[i];
        }
    }
    return map;
}

export function arrayToMapArray(arr, key) {
    let map = {};
    if(Array.isArray(arr)) {
        for(let i = 0; i < arr.length; ++i) {
            if(!map[arr[i][key]]) {
                map[arr[i][key]] = [];
            }
            map[arr[i][key]].push(arr[i]);
        }
    }
    return map;
}

//password 단방향 암호화
export function encryptSHA256Hmac(secretKey: string, encData: string) {
	try {
		return sha256.hmac(secretKey + "xwspqj)(#", encData + "eptigvy@&^(");	
	} catch(e) {
		return undefined;
	}
}

const devSecretKey = "2r5u8x!A%D*G-KaPdSgVkYp3s6v9y$B?";
const devIvKey = "mZq4t7w!z$C&F)J@";
const prodSecretKey = "H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkX";
const prodIvKey = "6w9z$C&F)J@NcRfU";

// 암호화
export function encrypt(data: string, is128: boolean = false) {

	try{
		let secretKey;
		let ivKey;

		// if(proc == 'PROD') {
			secretKey = prodSecretKey;
			ivKey = prodIvKey;
		// } else {
		// 	secretKey = devSecretKey;
		// 	ivKey = devIvKey;
		// }

		let secret_buffer = Buffer.from(is128 ? secretKey.substring(0, 16) : secretKey);
		let iv_buffer = Buffer.from(ivKey);

		let encType = is128 ? 'aes-128-cbc' : 'aes-256-cbc';
		let cipher = crypto.createCipheriv(encType, secret_buffer, iv_buffer);
		let encrypted = cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
		
		return encrypted;
	}catch(e) {
		throw new CoreError(E_INTERNAL_SERVER, 'encrypt fail',e);
	}
	
}

// 복호화
export function decrypt(data: string, is128: boolean = false) {

	try {

		let secretKey;
		let ivKey;

		// if(proc == 'PROD') {
			secretKey = prodSecretKey;
			ivKey = prodIvKey;
		// } else {
		// 	secretKey = devSecretKey;
		// 	ivKey = devIvKey;
		// }

		let secret_buffer = Buffer.from(is128 ? secretKey.substring(0, 16) : secretKey);
		let iv_buffer = Buffer.from(ivKey);

		let encType = is128 ? 'aes-128-cbc' : 'aes-256-cbc';
		let decipher = crypto.createDecipheriv(encType, secret_buffer, iv_buffer);
		let decrypt  = Buffer.concat([decipher.update(data, 'base64'), decipher.final()]) 
		
		let decrypted = decrypt.toString();
	
		return decrypted;
	}catch(e) {
		throw new CoreError(E_INTERNAL_SERVER, 'decrypt fail');
	}

}

export function now(form: string = 'YYYY-MM-DD HH:mm:ss') {
	return moment().format(form);
}

export function addNow(amount: number, unit: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year', format: string = 'YYYY-MM-DD HH:mm:ss') {
	return moment().add(amount, unit).format(format);
}

/**
 * 
 * @param d Date
 * @param format d: date, dt: datetime, t: time
 * @returns 
 */
export function translationDatetime(d, deci?: 'd' | 't') {
	if(!d) return ;
	let format = 'YYYY-MM-DD HH:mm:ss';
	if(deci == 'd') format = 'YYYY-MM-DD';
	else if(deci == 't') format = 'HH:mm:ss'; 
	return moment(new Date(d)).format(format);
}

export function getID(type) {
	let sf = moment().format("YYMMDDmmss");
	let sb = '';

	let randNum = Math.floor(Math.random())*10000+1000;
	if(randNum > 10000){
		randNum = randNum - 1000;
	}

	
	sb += type;
	sb += sf;
	sb += randNum;


	return sb;
}

export function getUUIDv4() {
	let uuid = uuidv4();
	return uuid.replace(/\-/ig, '');
}

export function filter(str: string) {
	let BAD_WORDS = ['10알','10팔','10발넘','10발년','10발놈','10새끼','10쎄끼','10창','10챵','10탱','10탱아','10팔년','10팔놈','10할년','18놈','18세끼','18새끼','18넘','18년','강간','같이자자','개라슥','개새끼','개새야','개색','개색기','개색끼','개샛키','개샛끼','개샤끼','개쌍넘','개쌍년','개십팔','개자식','개자지','개잡년','개잡놈','개찌질이','개후랄','개후레','개후장','겁탈','계약동거','계약애인','고공섹스','고우섹스','고패티쉬','고픈녀','고픈여','공육공','과부촌','광녀','교환부부','구녕','구멍에쑤실까','국제성인마트','굴래머','굴램','굴레머','굿섹스클럽','그년','그룹섹','그룹섹스','그지새끼','그지새키','그지좃밥','그지좆밥','근친상간','꼴갑','꼴값','꼴갚','꼴깝','꼴통','꼴려','꼴리는','꼴캅','꼽냐','나너먹을께','나먹어줘','나를싸게','나를흥분','나쁜년','나쁜뇬','나체','남녀섹시속옷','남녀자위기구','남성단련용품','남성자위기구','넣게벌려','넣고싸고','네버섹스','노팬티','노브라','노출증','노콘','누드','눈깔','다리벌려','다리벌리','다보자성인영화관','다음섹스','다이섹스','단란주점','대가리','대박성인토탈몰','대줄년','돌림빵','두두섹스','뒈져','뒈져라','등신','디져라','디진다','디질래','딜도','딥콜','따먹기','따먹는','따먹어','따먹혀줄래','딸딸이','떡걸','떡촌','떡치기','라이브스트립','라이브섹스','러브베드','러브섹시클럽','러브호텔','러시아걸','레드섹스TV','레아뒤','레즈','로리타','롤리타','룸사롱','룸살롱','룸섹스','룸쌀롱','리얼에로','립서비스','마스터베이션','매춘','모노섹스','몰래보기','몰래카메라','몰래캠코더','몰카','몸안에사정','몸캠','무료몰카','무료성인','무료성인동영상','무료성인만화','무료성인방송','무료성인싸이트','무료성인엽기','무료성인영화','무료성인정보','무료섹스','무료섹스동영상','무료섹스사이트','무료야설','무료포르노','무료포르노동영상','무삭제원판','무전망가','미국포르노','미소녀섹스가이드','미친년','미친놈','바이브레이터','박고빼고','박고싶다','박고싶퍼','박아줄게','박아줄께','박을께','박을년','밖에다쌀께','밤일','배위에싸죠','벌렁거려','벌려','벌릴여자','벙개남','병신','보지','보지물','보지걸','보지구녕','보지구멍','부랄','부럴','부부섹스','불륜','불알','빠구리','빨간마후라','빨고싶다','빨고싶어','빨고파','빨구시퍼','빨구싶나','빨구싶어','빨기','빨아','빨아도','빨아봐','빨아죠','빨아주고싶어','빨어','빨어핥어박어','빨자','빨자좃','사까시','사창가','사까치','사이버섹스','사카시','삽입','상놈','상년','상노무','새꺄','새X','색골','색광','색기','색남','색녀','색마','색수','색쉬','색스','색스코리아','색쑤','색쓰','색키','색파트너','샤앙녀','샤앙년','샤럽','샤불년','샹년','샹넘','샹놈','서양뽀르노','서양이쁜이','性','성경험','성관계','성폭행','성감대','성고민상담','성과섹스','성교제','성기구','성보조기구','성욕구','성인갤러리','성인게시판','성인극장','성인놀이문화','성인대화방','성인동영상','성인드라마','성인만화','성인사이트','성인자료실','성인게임','성인공간','성인그리고섹스','성인나라','성인누드','성인뉴스','성인대화','성인만화나라','성인만화천국','성인망가','성인몰','성인무료','성인무료동영상','성인무료사이트','성인무료영화','성인무비','성인물','성인미스랭크','성인미팅방','성인방','성인방송','성인방송국','성인방송안내','성인별곡','성인비디오','성인사이트소개','성인사진','성인상품','성인생방송','성인샵','성인서적','성인성교육스쿨','성인소녀경','성인소라가이드','성인소설','성인쇼','성인쇼핑','성인시트콤','성인싸이트','성인애니','성인애니메이션','성인야동','성인야사','성인야설','성인야캠','성인야화','성인에로무비','성인에로영화','성인엽기','성인영상','성인영화','성인와레즈','성인용','성인용품','성인용CD','성인유머','성인자료','성인잡지','성인전용관','성인전용정보','성인정보','성인채팅','성인천국','성인체위','성인카툰','성인카페','성인컨텐츠','성인클럽','성인포탈','성인플래쉬','성인플래시','성인화상','성인화상채팅','성인CD','성인IJ','성체험','성추행','성충동','성클리닉','성테크닉','성행위','세끼','섹스','섹쑤','섹걸','섹골','섹남','섹녀','섹도우즈','섹뜨','섹마','섹수','섹쉬','섹슈','섹시','섹시갤러리','섹시걸','섹시게이트','섹시나라','섹시나이트','섹시누드','섹시뉴스','섹시매거진','섹시맵','섹시무비','섹시사진','섹시샵','섹시성인용품','섹시섹스코리아','섹시스타','섹시신문','섹시씨엔엔','섹시아이제이','섹시에로닷컴','섹시엔몰','섹시엔TV','섹시연예인','섹시재팬','섹시촌','섹시코디','섹시코리아','섹시클럽','섹시클릭','섹시팅하자','섹시팬티','섹시TV','섹티쉬','섹파트너','섹하자','섹한번','섹할','섹해','스트립쇼','스트립쑈','시댕','시뎅','시바','시발넘','시발년','시발놈','시뱅','시뱜','시벌','심야TV','십8','십놈','십새','써글넘','써글년','써글놈','써글','썩을넘','썩을년','썩을놈','쎄끈','씨바','씨발','씹년','씹놈','씹벌','씹알','씹창','씹탱','씹팔','씹팔년','씹새','씹새끼','씹새키','아가리','알몸','알몸쇼','애액','야동','야설','야캠','야한동영상','야한사진','야한누드','야한만화','야한사이트','양아치','에로','에로물','에로영화','에로69','에로동영상','에로라이브','에로무비','에로뮤직비디오','에로배우','에로비디오','염병','왕보지','왕자지','유방','유두','유흥','육봉','육구자세','음경','음담패설','인터넷성인방송','일본동영상','일본망가','일본미소녀','일본뽀르노','일본성인만화','일본성인방송','자위','자지','자위기구','자위남','자위녀','자위씬','자위용품','자위행위','정력','정력강화용품','정사씬모음','정사채널','정액','젖','젖가슴','젖꼭지','젖물','젖밥','젖빠지게','젖은팬티','젖탱이','젖통','조루','조빱','조또','조진다','족까','족밥','존나','존니','존만한','졷까','졷따','졸라','죤나','죤니','죨라','죳','죶','죹','주댕이','주둥이','쥐랄','쥐럴','지랄육갑','찌찌','찐따','창녀','창남','창년','凸','체위','최음제','커닐링구스','콘돔','쿤닐링구스','크리토리스','클럽에로','클럽AV스타','클리토리스','퇴폐','특수콘돔','패티쉬','패티시','페니스','페로몬','페미돔','페티걸','페팅','펠라티오','포로노','폰색','폰섹','피임기구','피임용품','호빠','호스트바','호스트빠','화냥년','화끈남','화끈녀','화류','후까시','후장','헤로인','히로뽕','FUCK','S파트너','S하고E싶다X','S하E자X','SE엑스','SECMA','SEKMA','SⓔX','ⓢEX','⒮⒠⒳','SEXSEXY','SEXY화상채팅','SORASEX']	
	for(let badword of BAD_WORDS) {
		let regexp = new RegExp(badword, 'ig')
		str = str.replace(regexp, '*');
	}
	return str;
}

export function lots(probability) {
	if(probability >= 1){
		var total : boolean[] = [];
		for(let i = 0; i < 100; ++i) {
			if(i < probability){
				total[i] = true;
			}else{
				total[i] = false;
			}
		}
		let select = Math.floor(Math.random() * 100);
		shuffle(total);
		console.log('select',select);
		console.log('win',total[select]);
		return total[select];
	}else{
		let total = Math.ceil(100/probability);
		let win = Math.floor(Math.random() * total);
		let select = Math.floor(Math.random() * total);
	
		return select == win;
	}
	
}

export function shuffle(array) {
	for (let index = array.length - 1; index > 0; index--) {

	  let randomPosition = Math.floor(Math.random() * (index + 1));

	  let temporary = array[index];
	  array[index] = array[randomPosition];
	  array[randomPosition] = temporary;
	}
}

export function camelCase(str: string) {   
  
	while(true) {
		let _index = str.indexOf('_');
		if(_index < 0) break;

		let upper = str[_index + 1].toUpperCase();
		let pre = str.substring(0, _index);
		let pos = str.substring(_index + 2);

		str = pre + upper + pos;
	}

	return str;
}

const db = {
	en : ["rosy palm and her 5 sisters","son of a motherless goat","fuckingshitmotherfucker","leather straight jacket","two fingers with tongue","prince albert piercing","missionary position","alabama hot pocket","chocolate rosebuds","double penetration","chick with a dick","cleveland steamer","leather restraint","one cup two girls","two girls one cup","wrinkled starfish","alaskan pipeline","bang (one's) box","female squirting","one guy one jar","reverse cowgirl","taking the piss","acrotomophilia","beaver cleaver","blow your load","carpet muncher","male squirting","menage a trois","motherfuckings","mound of venus","pleasure chest","rusty trombone","son of a bitch","son of a whore","son-of-a-bitch","yellow showers","2 girls 1 cup","beef curtains","brotherfucker","brown showers","carpetmuncher","clitty litter","clover clamps","cop some wood","dingleberries","dirty pillows","dirty sanchez","fingerfuckers","fingerfucking","fingerfucking","gender bender","golden shower","how to murdep","how to murder","masterbations","mothafuckings","mother fucker","mother fucker","motherfuckers","motherfucking","need the dick","piece of shit","sausage queen","shaved beaver","splooge moose","suicide girls","whorealicious","window licker","anal impaler","anal leakage","ball licking","ball sucking","barely legal","beef curtain","big knockers","bunny fucker","child-fucker","cockmongruel","cum dumpster","cum dumpster","cyberfuckers","cyberfucking","cyberfucking","dawgie-style","dendrophilia","doggie style","doggie-style","donkey punch","donkeyribber","douchewaffle","eat hair pie","eat hair pie","ejaculatings","fingerfucked","fingerfucked","fingerfucker","fingerfucker","fistfuckings","fistfuckings","flog the log","fuck buttons","fuck yo mama","fuck yo mama","fuckersucker","fudge packer","fudge-packer","goldenshower","homodumbshit","iberian slap","jungle bunny","make me come","masterbating","masterbation","masturbating","masturbation","microphallus","mothafuckers","mothafucking","mothafucking","motherfucked","motherfucker","motherfuckin","motherfuckka","muthafuckker","mutherfucker","porch monkey","pussy palace","pussy palace","pussylicking","pussypounder","raging boner","shaved pussy","sultry women","sumofabiatch","tittiefucker","urethra play","vorarephilia","auto erotic","baby batter","beardedclam","beastiality","beaver lips","blue waffle","blue waffle","bullet vibe","bullshitted","bust a load","butt-pirate","chi-chi man","clit licker","clusterfuck","cock pocket","cock sucker","cockholster","cockknocker","cockmongler","cockmuncher","cocksniffer","cock-sucker","cocksuckers","cocksucking","coprolagnia","coprophilia","cum chugger","cum chugger","cum guzzler","cum guzzler","cumdumpster","cunillingus","cunnilingus","cuntlicking","cuntlicking","cunt-struck","cunt-struck","cyberfucked","cyberfucked","cyberfucker","deep throat","dickbeaters","dickflipper","dick-sneeze","dicksucking","dicktickler","dickwhipper","dingleberry","doggiestyle","doggy style","doggy-style","donkeypunch","double dong","ejaculating","ejaculating","ejaculation","f u c k e r","fannybandit","fannyfucker","fartknocker","fingerfucks","fingerfucks","fistfuckers","fistfuckers","fistfucking","fistfucking","foot fetish","fuck puppet","fuck puppet","fuck trophy","fuck trophy","fudgepacker","hardcoresex","intercourse","junglebunny","lemon party","master-bate","master-bate","mothafuckas","mothafuckaz","mothafucked","mothafucked","mothafucker","mothafuckin","motherfucka","motherfucks","muthafecker","nimphomania","nsfw images","nymphomania","pedophiliac","penisbanger","penisfucker","penispuffer","pillowbiter","pole smoker","porchmonkey","pornography","prickteaser","sand nigger","shit fucker","shit fucker","shitspitter","slut bucket","slut bucket","spread legs","style doggy","tea bagging","thundercunt","tittyfucker","two fingers","unclefucker","venus mound","violet wand","whorehopper","asscracker","ass-fucker","ass-jabber","assmuncher","ass-pirate","autoerotic","baby juice","ball gravy","bestiality","black cock","bloodclaat","booooooobs","booty call","bumblefuck","buttcheeks","buttfucker","c0cksucker","chota bags","chota bags","circlejerk","cockburger","cockfucker","cockjockey","cockknoker","cockmaster","cockmonkey","cocknugget","cocksmoker","cocksucked","cocksucked","cocksucker","cockwaffle","cokmuncher","corksucker","corp whore","corp whore","crackwhore","cumguzzler","cunilingus","cunthunter","cuntlicker","cuntlicker","deepthroat","dickdipper","dickfucker","dickmonger","dickripper","dicksipper","dicksucker","dickweasel","dickzipper","dog-fucker","doggystyle","dominatrix","douchebags","douche-fag","eat a dick","eat a dick","eat my ass","ejaculated","ejaculates","ejaculates","faggotcock","fannyflaps","fingerbang","fingerfuck","fingerfuck","fistfucked","fistfucked","fistfucker","fistfucker","fleshflute","fuck-bitch","fuck-bitch","fuckbutter","fucknugget","gangbanged","gayfuckist","giant cock","god-damned","homoerotic","kunilingus","lovemaking","m45terbate","ma5terbate","masterbat*","masterbat3","masterbate","masturbate","mothafucka","mothafucks","motherfuck","muff diver","muffdiving","p.u.s.s.y.","paedophile","peckerhead","pedophilia","polesmoker","poop chute","poopuncher","prostitute","pussy fart","pussy fart","sandnigger","scissoring","shitbagger","shitbrains","shitbreath","shitcanned","slutdumper","strip club","teabagging","twatwaffle","undressing","whorehouse","analprobe","anilingus","assbandit","assbanged","assbanger","assfucker","assgoblin","asshopper","assjacker","asslicker","assmaster","assmonkey","assnigger","asspirate","asssucker","ball sack","barenaked","bastinado","batty boy","bescumber","bitch tit","bitchtits","bull shit","bullshits","bullturds","bung hole","butt fuck","butt plug","buttfucka","buttmunch","camel toe","chesticle","cock snot","cockblock","cockmunch","cocksmith","cocksmoke","cocksucks","cocksucks","cocksukka","cum freak","cum freak","cumbubble","cumjockey","cunt hair","cunt hair","cuntsicle","cuntsicle","cyberfuck","cyberfuck","date rape","dick head","dick hole","dick hole","dickheads","dickjuice","dog style","douchebag","dp action","dumbasses","ejaculate","ejakulate","fagfucker","fist fuck","fist fuck","fistfucks","fistfucks","fuck hole","fuck hole","fuckbrain","fuckheads","fuckstick","fuck-tard","fucktards","gang bang","gang-bang","gang-bang","gangbangs","gassy ass","gassy ass","goddamned","goddamnit","group sex","hot chick","jackasses","jail bait","jiggerboo","knobjocky","knobjokey","m-fucking","mothafuck","muff puff","muff puff","muffdiver","nob jokey","octopussy","pedophile","phone sex","pigfucker","pissflaps","poopchute","queerbait","queerhole","rosy palm","shitblimp","shiteater","shitfaced","shitheads","shithouse","shitstain","shittiest","shittings","skullfuck","strappado","threesome","throating","tittyfuck","tittywank","towelhead","tribadism","urophilia","wet dream","wh0reface","whoreface","zoophilia","arsehole","ass fuck","ass hole","assbangs","assclown","assfaces","assfukka","assholes","assmucus","assmucus","assmunch","assshole","asswhole","asswipes","ball gag","ballsack","bangbros","bastardo","bastards","beastial","beeyotch","big tits","birdlock","bitchass","bitchers","bitching","blow job","blow mud","blowjobs","blumpkin","bollocks","booooobs","bulldyke","bullshit","bunghole","buttfuck","buttmuch","buttplug","c.o.c.k.","cameltoe","camwhore","choc ice","clitface","clitfuck","clitorus","cockbite","cockface","cockhead","cocklump","cocknose","cockshit","cocksuck","cocksuck","cocksuka","coksucka","coonnass","cornhole","cornhole","cumshots","cumstain","cuntface","cunthole","cuntlick","cuntlick","cuntslut","cyberfuc","daterape","dick shy","dick shy","dickface","dickfuck","dickhead","dickhole","dick-ish","dickmilk","dickslap","dickweed","doochbag","dry hump","dumb ass","dumbcunt","dumbfuck","dumbshit","erection","essohbee","felching","fellatio","feltcher","fistfuck","foreskin","frotting","fuck off","fuck you","fuck-ass","fuck-ass","fuckbutt","fuckedup","fuckface","fuckhead","fuckhole","fuckings","fuckmeat","fuckmeat","fucknutt","fucktard","fucktart","fucktwat","fuckwhit","fuckwitt","futanari","gangbang","godsdamn","goo girl","goodpoop","goregasm","hand job","horniest","hot carl","jack off","jackhole","jack-off","jailbait","jerk off","jerk-off","jiggaboo","kinkster","knobhead","ma5terb8","masterb8","mcfagget","nobjocky","nobjokey","numbnuts","nut sack","omorashi","orgasims","orgasmic","pedobear","phonesex","phukking","piss pig","ponyplay","poontang","retarded","s.h.i.t.","shagging","shit ass","shitcunt","shitdick","shitface","shitfuck","shitfull","shithead","shithole","shitings","shitters","shitters","shittier","shitting","slanteye","slutkiss","sodomize","strap on","testical","testicle","tit wank","tit wank","tub girl","twathead","twatlips","vajayjay","veqtable","whorebag","a$$hole","a55hole","apeshit","assbang","assbite","asscock","assface","assfuck","assh0le","ass-hat","asshead","assho1e","asshole","asslick","assshit","asswipe","axwound","ballbag","bastard","beaners","bellend","bestial","bigtits","bitched","bitcher","bitches","bitchin","blow me","blowjob","boiolas","bollock","bondage","boobies","boooobs","breasts","bumclat","c.0.c.k","c.u.n.t","c-0-c-k","camgirl","camslut","c-o-c-k","cockass","cockeye","coochie","cripple","cumdump","cumdump","cumming","cumshot","cumslut","cumtart","c-u-n-t","cuntass","cuntbag","cuntbag","cuntrag","dickbag","dickish","dickwad","dickwod","diligaf","dipship","dipshit","dogging","dolcett","douchey","dumbass","dumshit","erotism","f u c k","f.u.c.k","f_u_c_k","fagging","faggitt","faggots","fagtard","fcuking","felcher","fellate","fisting","footjob","f-u-c-k","fuckass","fuckbag","fuckboy","fuckers","fucking","fucknut","fuckoff","fucktoy","fucktoy","fuckwad","fuckwit","fukkers","fukwhit","gay sex","gayfuck","gaytard","goddamn","handjob","humping","jackass","jackoff","jerk0ff","jerkass","jerkoff","jigaboo","kinbaku","knobead","knobend","kooches","lameass","lardass","mafugly","mafugly","nawashi","nig nog","nigaboo","niggers","nig-nog","nobhead","nutsack","orgasim","orgasms","pegging","phallic","phuking","phukked","pisspig","pollock","poonani","poonany","punanny","pussies","raghead","reetard","rimming","s_h_i_t","schlong","s-h-1-t","shagger","shaggin","shemale","shibari","s-h-i-t","shitass","shitbag","shiting","shitted","shitter","shiznit","slutbag","sod off","splooge","strapon","suckass","t1tt1e5","t1tties","titfuck","tittie5","titties","titwank","tubgirl","twunter","upskirt","vjayjay","wankjob","wetback","whoring","assbag","asshat","asswad","azazel","bampot","beaner","beatch","beotch","biatch","bimbos","bitchy","bollok","bollox","boners","booger","booobs","bootee","bootie","boozer","bosomy","buceta","bugger","bummer","chincs","chinky","choade","choade","chodes","clitty","clunge","coital","commie","coochy","cooter","crappy","cretin","crikey","crotte","cummer","cummin","cunnie","cyalis","d0uch3","d0uche","dammit","dildos","doggin","dommes","doofus","dookie","douch3","douche","dumass","erotic","escort","extacy","extasy","fagbag","fagged","faggit","faggot","fagots","fatass","fcuker","feltch","femdom","fenian","fisted","floozy","fondle","fooker","fucked","fucker","fuckin","fuckme","fuckme","fuckup","fukker","fukkin","fukwit","gayass","gaybob","gaysex","gaywad","gigolo","goatcx","goatse","gokkun","g-spot","hentai","heroin","herpes","homoey","honkey","hooker","hotsex","humped","inbred","incest","jerked","jizzed","knobed","kootch","l3i+ch","l3itch","lezzie","lolita","molest","moolie","murder","muther","n1gger","nambla","nigg3r","nigg4h","niggah","niggas","niggaz","nigger","niglet","nudity","nympho","opiate","orgasm","orgies","peepee","penial","penile","phuked","pimpis","polack","pornos","pricks","punani","punany","pussys","queero","raping","rapist","raunch","retard","rimjaw","rimjob","ritard","r-tard","s.o.b.","sadism","sadist","schizo","scroat","scrote","shited","shitey","shitty","smutty","sodomy","spooge","stiffy","stoned","testee","testes","testis","tities","tosser","tranny","twatty","undies","v14gra","vagina","va-j-j","wanker","whored","whores","wigger","yeasty","a_s_s","ahole","arrse","asses","b!tch","b00bs","b17ch","b1tch","bi+ch","bimbo","bitch","boned","boner","boobs","booby","boong","booze","boozy","bosom","busty","chinc","chink","choad","chode","clits","coons","cunny","cunts","d1ld0","d1ldo","dicks","dildo","doosh","dopey","erect","f4nny","faggs","fagot","faigt","fanyy","fecal","felch","fisty","fubar","fucka","fucks","fuker","fux0r","gaydo","gippo","glans","gooks","gspot","hobag","honky","horny","juggs","kafir","kikes","kooch","labia","leper","lezza","mo-fo","moron","mutha","n1gga","negro","nigga","nonce","opium","penis","phuck","phuks","porno","potty","prick","pubes","pubic","pubis","pusse","pussi","pussy","queaf","queaf","queef","raped","raper","rapey","renob","rtard","s hit","scrog","scrot","semen","shite","shits","shitt","shota","slave","sluts","snuff","s-o-b","spook","spunk","teets","teste","titty","tramp","tushy","twats","twunt","v1gra","vixen","vulva","wanky","wazoo","wh0re","whoar","whore","yiffy","yobbo","zibbi","2g1c","4r5e","5h1t","5hit","anal","ar5e","arse","barf","bdsm","bint","bong","boob","bung","c0ck","cawk","cipa","cl1t","clit","cnut","coon","crap","cums","cunt","d0ng","d1ck","dick","dlck","fack","fagg","fags","faig","fcuk","foad","fuck","fuck","fuks","fvck","fxck","gtfo","h0m0","h0mo","hoer","hom0","hore","japs","jerk","jism","jizm","jizm","jizz","jock","kike","kunt","kwif","kyke","lube","m0f0","m0fo","meth","milf","mof0","mofo","nude","orgy","p0rn","paki","phuk","phuq","pimp","poof","poon","porn","prig","pron","pthc","pube","puss","quim","rape","scum","seks","sexo","sh!+","sh!t","sh1t","shag","shi+","shit","shiz","slut","smut","stfu","taff","taig","tard","teat","teez","titi","tits","titt","turd","tush","tw4t","twat","wang","wank","yaoi","zubb","a$$","a2m","a55","ass","azz","bbw","cok","cum","fag","fuc","gfy","jap","jiz","jiz","pee","s0b","sex","t1t","tit","vag","wad","wog","wop","wtf","yid"],
	ja : ["特定アジア","トルコ風呂","fuck","shit","バカ野郎","腐れ外道","肉便器","糞野郎","部落民","中出し","人非人","負け犬","未開人","強姦","鬼畜","支那","淫売"],
	ko : ["후장뚫어18세키","dogbaby","18ㅅㅐㄲㅣ","18ㅅㅔㅋㅣ","yadong","ㅌㅓㄹㅐㄱㅣ","따아알따아리","막대쑤셔줘?","보지머리박기","보지에자지껴","보지에자지너","보지핧아줄까","여자ㄸㅏ먹기","여자ㄸㅏ묵기","조개마셔줘?","조개벌려조?","조개쑤셔줘?","조개핧아줘?","터래기터래기","혀로보지핧기","18nom","18num","18ㅅㅐ끼","18ㅅㅔ키","18세ㅋㅣ","sex하자","가슴조물락","가슴주물럭","가슴쪼물딱","가슴쪼물락","개씨발자슥","개애거얼래","개에거얼래","개젓가튼넘","개후라들놈","개후라새끼","걸레같은년","괴에가튼?","따먹어야지","따아알따리","떠어라아이","또오라아이","막대핧아줘","미친씨부랄","바주카자지","버따리자지","버어어지이","버지따먹기","버지물마셔","버짓물마셔","벌창같은년","보지따먹기","보지물마셔","보지벌리자","보지쥐어짜","보지털뽑아","보지틀래기","보지핧아줘","보짓물마셔","빠아구우리","사까아시이","쉬이이이이","쓰브랄쉽세","야dong","어미따먹자","어미쑤시자","여자따먹기","여자따묵기","유발조물락","유방주물럭","유방쪼물딱","유방쪼물럭","유우우방것","자지빨아줘","자지쓰레기","자지핧아줘","잠지물마셔","잠짓물마셔","젓가튼쉐이","조개넓은년","조개따조?","조오우까튼","좃만한쉐이","좆같은새끼","좆만한새끼","쳐쑤셔박어","촌씨브라리","촌씨브랑이","촌씨브랭이","크리토리스","클리토리스","sibal","fuck","shit","18새끼","18세키","boji","bozi","jaji","jazi","jot같","sex해","zaji","zazi","ㅅㅐㄲㅣ","ㅆㅣㅂㅏ","ㅆㅣ팍넘","ㅇㅍㅊㅌ","가슴만져","가슴빨아","가슴빨어","가슴핧아","가슴핧어","강간한다","같은새끼","개가튼년","개가튼뇬","개같은년","개거얼래","개거얼레","개념빠가","개보지년","개쓰래기","개쓰레기","개씁자지","개씨발넘","개애걸래","개에가튼","개에걸래","개작두넘","개작두년","개잡지랄","개저가튼","개지랄넘","개지랄놈","개후라년","걔잡지랄","거지같은","걸레보지","걸레핀년","게에가튼","게지랄놈","그나물에","나쁜새끼","난자마셔","난자먹어","난자핧아","내꺼빨아","내꺼핧아","너거애비","노무노무","누나강간","니씨브랄","니아범?","니할애비","대애가리","대에가리","더어엉신","더러운년","덜은새끼","돌은새끼","동생강간","뒤이치기","뒤져야지","뒤지고싶","뒷잇치기","드으응신","따먹는다","따먹었어","따먹었지","따먹을까","따알따리","떠어라이","또오라이","띠부우울","띠이바알","띠이버얼","띠이이발","띠이이벌","맛없는년","맛이간년","미시친발","미친구녕","미친구멍","미친새끼","미친쉐이","버어어지","버어지이","버지구녕","버지구멍","버지냄새","버지뚫어","버지뜨더","버지벌려","버지벌료","버지빨아","버지빨어","버지썰어","버지쑤셔","버지핧아","병신세리","병신셰리","병신씨발","보지구녕","보지구멍","보지뚫어","보지뜨더","보지박어","보지벌려","보지벌료","보지벌리","보지보지","보지빨아","보지빨어","보지자지","보지정액","보지찌져","보지찢어","보지털어","보지핧아","보지핧어","뷰우웅신","뷰웅시인","빙신쉐이","빠가야로","빠가십새","빠가씹새","빠아구리","빠아아라","사까시이","사까아시","새77ㅣ","성교하자","섹스하자","쉬이이이","시미발친","시미친발","시바라지","시바시바","시박색히","시박쉑히","시발새끼","시방색희","시방쉑희","시새발끼","시입세에","시친발미","시팍새끼","시팔새끼","십탱구리","십탱굴이","십팔새끼","싸가지없","쌍쌍보지","쓰래기같","쓰레기새","쓰바새끼","씨가랭넘","씨가랭년","씨가랭놈","씨박색희","씨박색히","씨박쉑히","씨발병신","씨뱅가리","씨벌쉐이","씨븡새끼","씨새발끼","씨입새에","씨입세에","씨팍새끼","씨팍세끼","씨퐁보지","씨퐁자지","씹탱굴이","아아가리","아오ㅅㅂ","아오시바","애미보지","애미씨뱅","애미자지","애미잡년","애미좃물","어미강간","엿먹어라","오르가즘","왕털버지","왕털보지","왕털자지","왕털잠지","유두빨어","유두핧어","유방만져","유방빨아","유방핧아","유방핧어","유우까압","자기핧아","자지구녕","자지구멍","자지꽂아","자지넣자","자지뜨더","자지뜯어","자지박어","자지빨아","자지빨어","자지쑤셔","자지정개","자지짤라","자지핧아","자지핧어","작은보지","잠지뚫어","젓대가리","젓물냄새","정액마셔","정액먹어","정액발사","정액핧아","정자마셔","정자먹어","정자핧아","조개보지","조개속물","조오가튼","조오까튼","조오오조","조오온니","조오올라","조온마니","조옴마니","조우까튼","좀쓰레기","좁빠라라","좃가튼뇬","좃대가리","좃마무리","좃만한것","좃물냄새","좃빠구리","좃빠라라","좆같은놈","좆만한년","좆만한놈","좋만한것","주둥아리","지이라알","쪼다새끼","창녀버지","창년벼지","캐럿닷컴","항문수셔","항문쑤셔","허버리년","허벌보지","허벌자식","허벌자지","헐렁보지","호로새끼","호로자슥","호로자식","호루자슥","후라덜넘","후우자앙","후장꽂아","후장뚫어","18년","18놈","d쥐고","d지고","me췬","me친","me틴","mi친","mi틴","ya동","ㅁㅣ췬","ㅂㅁㄱ","ㅅ.ㅂ","ㅅㄲ네","ㅅㄲ들","ㅅㅡ루","ㅆㄹㄱ","ㅆㅣ8","ㅆㅣ댕","ㅆㅣ뎅","ㅆㅣ바","ㅆㅣ발","ㅇㅒ쁜","ㅈ.ㄴ","ㅈㅏ위","ㅉ질한","ㄱㅅㄲ","개.웃","개가튼","개같이","개걸래","개걸레","개고치","개너미","개라슥","개마이","개보지","개부달","개부랄","개불랄","개붕알","개새기","개새끼","개색뀌","개색휘","개샛기","개소리","개쉐뀌","개씁년","개씁블","개씨발","개씨블","개아기","개자식","개자지","개잡년","개저씨","개저엇","개지랄","개후라","걔잡년","거시기","걸래년","걸레년","게가튼","게부럴","게저엇","계새끼","괘새끼","괴가튼","굿보지","김대중","김치녀","깨쌔끼","나빼썅","내미랄","내미럴","내버지","내씨발","내자지","내잠지","내조지","노네들","노알라","노무현","느그매","니기미","니미기","니미랄","니미럴","니아범","니애미","니애비","닝기리","닥쳐라","닥치세","달달이","달딸이","닳은년","대가리","대음순","더엉신","돈새끼","돌았네","돌으년","뒤져라","뒤져버","뒤져야","뒤져요","뒤지겠","뒤지길","뒤진다","뒤치기","뒷치기","드응신","디져라","디지고","따먹기","따먹어","따먹자","딸달이","딸딸이","떠라이","또라이","또라인","똘아이","띠발뇬","띠부울","띠브울","띠블넘","띠이발","띠이벌","막간년","맛간년","미쳣네","미쳤나","미쳤니","미치인","미친ㅋ","미친개","미친넘","미친년","미친놈","미친눔","미친새","미친색","미티넘","미틴것","방점뱅","백보지","버어지","버지털","버짓물","보지녀","보지물","보지털","보짓물","뷰웅신","빠가냐","빠간가","빠가새","빠가니","빠구리","빠구울","빠굴이","빠아가","빡새끼","빨치산","사까쉬","사까시","사새끼","새ㄲㅣ","새끼라","새끼야","성교해","성폭행","세엑스","세엑쓰","섹스해","소음순","쉬방새","쉬이바","쉬이이","쉽알넘","슈ㅣ발","슈우벌","슨상님","시댕이","시바류","시바알","시바앙","시발년","시발놈","시방새","시벌탱","시볼탱","시부럴","시부렬","시부울","시뷰럴","시뷰렬","시이발","시입세","시키가","시팔넘","시팔년","시팔놈","십버지","십부랄","십부럴","십세리","십세이","십셰리","십쉐끼","십자석","십자슥","십지랄","십창녀","십팔넘","싸가지","싸물어","쌍보지","쌔엑스","쎄엑스","씨ㅂㅏ","씨댕이","씨바라","씨바알","씨발년","씨발롬","씨방새","씨방세","씨버럼","씨벌년","씨벌탱","씨볼탱","씨부랄","씨부럴","씨부렬","씨불알","씨뷰럴","씨뷰렬","씨브럴","씨블년","씨빠빠","씨섹끼","씨이발","씨입새","씨입세","씨파넘","씨팍넘","씨퐁넘","씨퐁뇬","씹미랄","씹버지","씹보지","씹부랄","씹브랄","씹빵구","씹뻐럴","씹뽀지","씹새끼","씹쉐뀌","씹쌔끼","씹자석","씹자슥","씹자지","씹지랄","씹창녀","씹탱이","씹팔넘","아가리","애미랄","애애무","애에무","애에미","애에비","에애무","에에무","에에미","에에비","여어엄","여엄병","염병할","엿이나","왕버지","왕자지","왕잠지","왜저럼","유우깝","유우방","은새끼","이새끼","자압것","자지털","잠지털","젓같내","젓냄새","젓만이","정액짜","젖탱이","졌같은","조가튼","조오또","조오웃","조오지","조온나","조온니","조온만","조올라","조옷만","족같내","족까내","존.나","존ㄴ나","존나아","존마니","좀마니","좃간년","좃까리","좃깟네","좃냄새","좃만아","좃만이","좃보지","좃부랄","좃빠네","좆까라","좆만아","좆먹어","좆빨아","좆새끼","좋오웃","죠온나","주글년","주길년","주둥이","줬같은","지껄이","ㅈ1랄","지이랄","쪽바리","찝째끼","쳐받는","쳐발라","친구년","친노마","큰보지","페니스","허벌년","허벌레","허어벌","호냥년","호로자","호로잡","화낭년","화냥년","후.려","후라덜","후우장","미칭럼","느금마","ㅈ같네","ㅁㅊ","ㅁ친","ㅂㄹ","ㅂㅊ","ㅂ크","ㅅㅂ","ㅅㅍ","ㅅㅋ","ㅅ루","ㅅ발","ㅆㄺ","ㅆㅂ","ㅆㅣ","ㅈㄴ","ㅈㄹ","ㅈ리","강간","개간","개같","개넷","개년","개놈","개독","개련","개섹","개셈","개젓","개좆","개쩌","게젓","골빈","공알","구씹","귀두","꼭지","년놈","뇌텅","뇨온","늬믜","늬미","니년","니믜","니미","닥쳐","대갈","돈년","뒈져","뒤졌","뒤질","등신","디졌","디질","딴년","띠바","띠발","띠벌","띠벨","띠불","띠블","런년","럼들","롬들","맘충","머갈","믜칀","믜친","미띤","미췬","미칀","미친","미틴","및힌","발놈","벌창","벵신","별창","병닥","병딱","병맛","병신","병크","보지","봉알","부랄","불알","붕신","붕알","븅신","브랄","빙띤","빙신","빠굴","빠네","빠라","빠큐","빻았","빻은","뻐규","뻐큐","뻑유","뻑큐","뻨큐","뼈큐","뽀지","상년","새끼","새퀴","새킈","새키","색희","색히","샊기","샊히","샹년","섀키","성괴","성교","세끼","세키","섹끼","섹스","쇅끼","쇡끼","쉐끼","쉬박","쉬발","쉬버","쉬빡","쉬탱","쉬팍","쉬펄","쉽세","슈발","슈벌","스벌","싑창","시바","시파","시발","시벌","시빡","시빨","시탱","시팍","시팔","시펄","십녀","십새","십세","십창","십탱","십팔","싹스","쌍년","쌍놈","쌔끼","쌕스","쌕쓰","썅놈","썅년","썌끼","쎄끼","쎄리","쎅스","쎅쓰","쒸8","쒸댕","쒸발","쒸팔","쒸펄","쓰댕","쓰뎅","쓰렉","쓰루","쓰바","쓰발","쓰벌","쓰벨","쓰파","씌8","씌댕","씌뎅","씌발","씌벨","씌팔","씝창","씨8","씨걸","씨댕","씨뎅","씨바","씨발","씨벌","씨벨","씨블","씨븡","씨비","씨빡","씨빨","씨뻘","씨입","씨팍","씨팔","씨퐁","씹귀","씹년","씹덕","씹못","씹물","씹새","씹세","씹쌔","씹창","씹치","씹탱","씹팔","씹할","아닥","애무","애미","애비","앰창","야동","엄창","에무","에미","에비","엠생","엠창","염병","염뵹","엿같","옘병","외퀴","요년","유깝","유두","유방","육갑","은년","음경","이년","자위","자지","잠지","짬지","잡것","잡년","잡놈","저년","저엇","저엊","적까","절라","점물","젓까","젓떠","젓물","젓밥","젖같","젖까","젗같","젼나","젼낰","졏같","조깟","조또","조온","족까","존귀","존귘","존나","존낙","존내","존니","존똑","존맛","존멋","존버","존싫","존쎄","존쎼","존예","존웃","존잘","존잼","존좋","존트","졸귀","졸귘","졸라","졸맛","졸멋","졸싫","졸예","졸웃","졸잼","졸좋","좀물","좁밥","좃까","좃넘","좃도","좃또","좃물","좃털","종나","좆까","좆나","좆년","좆도","좆물","좆밥","좆털","좋만","죠낸","죤나","죤내","죵나","쥐랄","쥰나","쥰내","쥰니","쥰트","즤랄","지랄","지럴","지롤","지뢀","지뢰","짱깨","짱께","쪼녜","쪼다","쪽발","쫓같","쬰잘","창남","창녀","창년","창놈","처먹","첫빠","쳐마","쳐먹","취ㅈ","취좃","친년","친놈","파친","펑글","항문","허벌","호로","후려","후장","꽃휴","ㅂㅅ","걔섀","느금","늑음","ㅈ같","ㅄ","凸","뇬","썅","씹","좃","좆","좇","죶","쫂","쬲"],
	zh : ["唐僧和粉塵女子的性愛生活","江山如此多嬌txt下載","一夜情激情成人聊天室","性愛韋小寶之玩女大王","去氧麻黃堿製作方法","金鱗豈是池中物全本","美女面對面激情裸聊","香煙迷藥催眠迷幻藥","菅野亞梨沙迅雷下載","極品金髮美女美穴圖","55sss偷拍區","BlowJobs","出售鹽酸曲馬多片","花都逍遙鄉村春光","硝酸甘油炸藥製造","黃色妹妹a級大片","黃色妹妹a級大片","16dy-圖庫","222se圖片","33bbb走光","A4U人體藝術","pornhub","XIAAV論壇","youporn","大母牛娛樂論壇","大眾色情成人網","出售氫化可的松","出售羥基環戊基","出售鹽酸曲馬多","出售鹽酸羥亞胺","合成鹽酸羥亞胺","色情倚天屠龍記","我的性啟蒙老師","供應天然咖啡因","供應四氫吡喃酮","供應甲基可哥堿","供應甲基苯丙胺","供應胡椒基甲基","供應氫化可的松","供應無水咖啡因","供應鹽酸羥亞胺","松島楓迅雷下載","美女視頻聊天室","美女激情視頻網","訂購鹽酸羥亞胺","浴室幹騷女系列","迷情藥製作方法","販賣king粉","婷婷激情聊天室","提供鹽酸羥亞胺","氯胺酮技術轉讓","買胡椒基甲基酮","買賣四氫吡喃酮","買賣鹽酸羥亞胺","製作鹽酸羥亞胺","銷售king粉","銷售天然咖啡因","銷售左旋麻黃素","銷售羥基環戊基","銷售鹽酸氯胺酮","銷售鹽酸羥亞胺","45MM狗糧","52異性社區","85porn","97sese","qvod成人","sex聊天室","SM後庭器具","Xvideo","九九情色帝國","人人有色論壇","小姐上門全套","午夜天堂成人","少女小姐上門","出售苯基丙酮","出售海豹M9","出售麻果配方","出售間苯三酚","出售黃白牙籤","出售鄰氯苯晴","出售磚石冰毒","出售鑽石冰毒","生小孩沒屁眼","白虎美女貼圖","成人情色網站","成人黃色網站","成人圖片網站","成人網站導航","成人激情小說","成人激情電影","成人激情圖片","成人激情網站","西班牙蒼蠅水","我愛我色網址","狂插男根膠囊","男女激情淫亂","迅雷三級影片","亞洲性交電影","供應麻果丸子","兩性淫亂地址","性愛視頻下載","放蕩少婦賓館","東京丸井買賣","波霸乳交器具","哇嘎成人三級","紅蜘蛛迷奸藥","美女性交真圖","訂購苯基丙酮","香水型迷奸藥","迷魂藥三唑侖","淫穢bt電影","現代情色小說","麻古製作工藝","黃色成人網站","微型袖珍手狗","對準桃源洞口","製造緬古合成","製造緬古合成","線上激情電影","銷售北朝鮮冰","銷售甲基苯丙","銷售苯基丙酮","銷售麻古果子","銷售間苯三酚","銷售黃綠牙籤","銷售趙氏弓弩","銷售鄰氯苯晴","龜頭對準陰道","雙管獵槍買賣","77bbb","一本道電影","一夜情論壇","三級激情片","小姐打飛機","中文搜性網","天天干貼圖","夫妻俱樂部","出售曲馬多","出售迷幻藥","出售迷情藥","出售麥角醇","出售麻黃素","出售氯胺酮","出售黃牙籤","出售黃麻素","出售黃體酮","出售監聽王","出售蒙汗藥","左旋黃麻素","全家死光光","合成氯胺酮","成人五月天","成人午夜場","成人聊天室","老師的小穴","肉淫器吞精","肉棍幹騷婦","色狐狸網址","我要性交網","狂插性器具","肛交吹喇叭","亞洲情色網","亞洲插穴圖","供應化學冰","供應可哥精","供應奶油冰","供應咖啡鹼","供應咖啡鹼","供應青蒿素","供應麥角醇","供應麻黃素","供應植物冰","供應氯胺酮","供應黃體酮","供應罌粟殼","供應鹽酸氯","性免費電影","性感沙灘2","明星裸體照","東北xx網","花和尚導航","品色堂網址","美女b毛圖","美女聊天室","訂購大冰磚","訂購氯胺酮","迷失禦花園","迷藥迷情藥","高效三唑侖","假陽具插穴","欲海天龍傳","淫穴裡騷水","淫蕩迷情藥","販賣搖頭丸","逍遙遊論壇","速效迷奸藥","陰穴新玩法","陰莖插小穴","掰穴皮卡丘","提供氯胺酮","插姐姐嫩穴","氯胺酮出貨","氯胺酮到貨","氯胺酮訂購","氯胺酮電話","無毛美少女","買賣小冰磚","買賣黃麻素","黃牙籤出售","舔弄大陰唇","舔弄小雞雞","蜜桃成熟時","製作氯胺酮","噴霧蒙汗藥","撅起大白腚","銷售水晶冰","銷售可哥精","銷售麻黃素","鹽酸氯胺酮","鹽酸羥亞胺","fuck","shit","80色區","mm美圖","SM援交","SM舔穴","sm調教","一夜性網","九城情色","二穴中出","人妻交換","人妻色誘","人妻做愛","人妻榨乳","人性本色","入穴一遊","上你幹妳","上門按摩","口內爆射","口含雞巴","大力抽送","大奶美逼","大奶騷女","大波粉B","大波騷婦","女馬白勺","小姐裸聊","小騷BB","互舔淫穴","勾魂少婦","天天情色","夫妻3p","夫妻多p","夫妻亂交","少女被插","日本鬼子","出售冰毒","出售麻古","出售槍支","出售鎂粉","去你媽的","奴隷調教","奶大屄肥","本土無碼","母女雙飛","母子交歡","母子姦情","生徒胸觸","甲基苯丙","甲基苯胺","白虎小穴","白虎少婦","白虎陰穴","白虎嫩B","白液四濺","白嫩騷婦","白漿四濺","交換夫妻","先奸後殺","多人性愛","好色cc","安非他命","成人A片","成人bt","成人下載","成人百強","成人自拍","成人社區","成人書庫","成人情色","成人軟體","成人圖片","成人網站","成人論壇","成人導航","老少亂倫","肉絲褲襪","肉感炮友","自拍美穴","自拍寫真","自插小穴","自慰摳穴","色97愛","色BB吧","色色成人","色界論壇","色狼小說","色狼論壇","色情工廠","色情論壇","你他馬的","你他媽的","你它馬的","你它媽的","你她馬的","你娘卡好","吞精騷妹","吸精少女","妖媚熟母","快樂AV","我要官人","我要性交","我做騷妻","我就去色","狂乳激揺","男女交歡","男女蒲典","肛門拳交","肛門噴水","走光偷拍","那娘錯比","那嗎老比","那嗎瘟比","那嗎錯比","乳此絲襪","亞洲有碼","亞洲性虐","亞洲淫娃","供應白冰","供應冰糖","供應麻穀","供應黃冰","制服美婦","制服誘惑","叔嫂肉慾","夜色王朝","夜色貴族","奇淫寶鑒","妹妹陰毛","妹妹騷圖","屄屄特寫","性交自拍","性交吞精","性交無碼","性虎色網","性愛淫圖","性愛插穴","性愛擂臺","性感肉絲","性感妖嬈","性感乳娘","性感誘惑","性感騷女","性戰擂臺","拍肩迷藥","拔屄自拍","放蕩少婦","放蕩熟女","明星淫圖","狗娘養的","狗狼養的","花樣性交","近親相奸","近親相姦","俏臀攝魄","前凸後翹","咪咪圖片","咬著龜頭","姦淫電車","帝國夜色","春光外瀉","毒品出售","毒龍舔腳","洗腸射尿","炮友之家","美女成人","美女吞精","美女高潮","美女淫穴","美女祼聊","美乳美穴","美乳鬥豔","美臀夾陰","美臀嫰穴","美體豔姿","虐戀花園","風騷欲女","風騷淫蕩","原味絲襪","套弄花心","恥辱輪奸","捏你鶏巴","桃園蜜洞","浴室亂倫","胯下呻吟","胸濤乳浪","迷奸系列","迷奸香水","針孔偷拍","高清性愛","高潮白漿","高潮集錦","高麗棒子","鬼畜輪奸","做愛自拍","做愛電影","做愛圖片","偷拍美穴","偷窺圖片","偷歡照片","動漫色圖","婬亂軍團","寂寞自摸","密穴貼圖","欲仙欲死","欲仙欲浪","殺你一家","殺你全家","淫穴騷水","淫奸電影","淫肉誘惑","淫色貼圖","淫妻交換","淫師蕩母","淫絲蕩襪","淫亂工作","淫亂診所","淫亂潮吹","淫亂熟女","淫戰群P","淫蕩貴婦","淫聲浪語","淫穢圖片","淫獸學園","猛操狂射","處女開包","野外性交","陰阜高聳","陰道圖片","雪腿玉胯","媚藥少年","廁所偷拍","廁所盜攝","掰穴打洞","提供K粉","提供冰毒","插穴手淫","插穴止癢","插老師穴","無套自拍","無碼長片","無碼炮圖","無碼做愛","無碼淫女","無碼淫漫","無碼無套","無碼精選","無碼體驗","童顏巨乳","絲襪足交","絲襪高跟","絲襪淫婦","街頭扒衣","超毛大鮑","酥胸誘惑","集體性愛","塞你老母","塞你老師","幹你老比","幹你老母","幹你媽b","幹你媽逼","幹妳老母","惹火自拍","愛色cc","愛妻淫穴","愛液橫流","新金瓶梅","極品奶妹","極品白虎","極品波神","極品波霸","經典炮圖","群交亂舞","群奸亂交","群奸輪射","群魔色舞","聖泉學淫","裙下風光","裙內偷拍","跨下呻吟","農夫電影","嫖妓指南","摸你鶏巴","瘋狂抽送","監禁陵辱","精液榨取","緊縛淩辱","裸聊網站","裸照圖片","裸露自拍","裸體少婦","誘色uu","誘惑視頻","嫵媚挑逗","暴力虐待","歐美大乳","歐美無套","熟女亂倫","熟女顏射","熟婦騷器","調教性奴","調教虐待","賣海洛因","銷售乙醚","銷售冰古","銷售純古","魅惑巨乳","操B指南","操穴噴水","操爛騷婦","操爛騷貨","激凸走光","激情打炮","激情交友","激情聊天","激情圖片","激情裸體","激情潮噴","濕身誘惑","縱情兵團","賽你老母","賽妳阿母","點色論壇","翹臀嫩穴","翹臀嫩逼","豐唇豔姬","雙龍入洞","雞巴暴脹","顏射自拍","爆乳人妻","騷女叫春","騷浪美女","騷婦掰B","騷婦露逼","騷逼噴水","灌滿精液","豔母淫臀","豔婦淫女","豔情小說","豔舞淫業","FM2","MM屄","ㄊㄇㄉ","三唑侖","大乳頭","大花逼","大雞巴","大鶏巴","女馬ㄉ","女馬的","小嫩雞","公媳亂","日死你","他ㄇㄉ","他ㄇ的","他嗎的","他媽的","凸肉優","出售腎","包二奶","可卡因","叼你媽","失身粉","打手槍","打飛機","打野炮","吃雞巴","多人輪","她馬的","她媽的","死GM","死全家","江豬媳","百性閣","百鳳宮","肉便器","舌頭穴","色書庫","色迷城","色窩窩","你老母","你麻痹","你媽比","你媽的","你媽逼","完蛋操","我操你","杜冷丁","足腳交","那嗎B","那嗎逼","制幻劑","制服狩","性之站","性奴會","性用品","性交易","性交圖","性交課","性服務","性派對","性虐待","性高潮","性無能","性視頻","性愛圖","性遊戲","性福源","性饑渴","東洋屄","狗卵子","金毛穴","俗人島","品色堂","品香堂","屌人也","屌女也","柔陰術","流蜜汁","美騷婦","要色色","風豔閣","海洛因","神經病","粉紅穴","草你娘","草你媽","草你媽","草擬媽","迷幻藥","迷奸藥","迷情水","迷魂藥","馬白勺","高級逼","鬼輪姦","採花堂","採花網","梅花屄","淫告白","淫東方","淫驢屯","羞恥母","就去日","扉之陰","插穴圖","插你媽","插後庭","插陰莖","朝天穴","無毛穴","菊花洞","集體淫","黑毛屄","塞你公","塞你母","塞你爸","塞你娘","媽白勺","媽媽色","幹78","幹７８","幹GY","幹ＧＹ","幹一家","幹七八","幹人也","幹女也","幹他媽","幹全家","幹她媽","幹死你","幹你良","幹你娘","幹你媽","幹妳娘","幹妳馬","幹妳媽","幹拎娘","幹您娘","幹機掰","想上你","愛幼閣","搖頭丸","搖頭丸","群陰會","萬淫堂","嫩BB","嫩鮑魚","摸陰蒂","瑪雅網","碧香亭","精液浴","舔屁眼","舔雞巴","蒙汗藥","銀民吧","慰春情","蓮花逼","蝴蝶逼","賣手槍","賤bi","銷魂洞","懆您娘","懆您媽","操人也","操女也","操母狗","操你媽","操機掰","龜兒子","龜孫子","鴻圖記","爆乳娘","麗春苑","騷姐姐","騷姨媽","露陰照","3P","GY","ＧＹ","G八","Ｇ八","G巴","Ｇ巴","G叭","Ｇ叭","G芭","Ｇ芭","G掰","Ｇ掰","g點","二B","三陪","下賤","口交","口活","口射","口淫","口爆","大b","大麻","女尻","女屄","女幹","小b","小穴","小逼","阝月","互淫","內射","手淫","日你","日屄","日逼","欠日","欠幹","毛鮑","王八","凸他","凸她","凸你","凸我","凸妳","巨騷","幼交","幼妓","幼逼","扒穴","扒屄","打炮","母奸","玉穴","玉乳","白粉","穴海","穴淫","穴爽","穴圖","冰毒","吃精","奸幼","肉穴","肉具","肉洞","肉唇","肉莖","肉壺","肉棍","肉溝","肉逼","肉慾","肉縫","肉簫","吞精","含屌","吸精","吹蕭","妓女","妓女","屁眼","我日","我奸","我草","我幹","我操","狂插","肛交","肛屄","乳尻","乳交","乳射","乳爆","乳霸","屄毛","性奴","性交","性兩","性具","性虎","性虐","性息","性聊","性傭","性愛","性夢","性福","抽插","拔屄","招妓","招鶏","放尿","狗b","狗日","狗娘","狗養","狗操","玩穴","玩逼","肏屄","肥逼","亮穴","亮屄","品穴","姦染","姦情","姦淫","姦淫","姫辱","屌他","屌她","屌你","屌我","屌妳","挑情","春藥","流淫","相奸","美幼","美穴","美乳","胡瘟","虐奴","迫奸","食精","哭母","哭爸","射奶","射爽","射精","射顏","拳交","捏弄","浪女","浪叫","浪穴","浪婦","浴尿","狼友","秘唇","粉穴","粉屄","迷奸","迷藥","做愛","婊子","密穴","淩辱","淫B","淫女","淫水","淫叫","淫奴","淫母","淫汁","淫穴","淫色","淫妞","淫妹","淫妻","淫姐","淫店","淫河","淫娃","淫流","淫虐","淫書","淫浪","淫婦","淫情","淫液","淫貨","淫腔","淫逼","淫圖","淫網","淫蜜","淫慾","淫樣","淫漿","淫賤","淫糜","淫穢","淫穢","淫癡","淫魔","爽穴","猖妓","猛插","聊色","被幹","被操","造愛","陰戶","陰毛","陰水","陰屄","陰門","陰阜","廁奴","掰穴","插b","插比","插穴","插進","插逼","插暴","換妻","發浪","發騷","酥穴","酥癢","開苞","陽具","陽痿","黑屄","黑逼","亂交","亂倫","亂輪","傻比","媽B","媽比","媽批","媽的","媽逼","嫐屄","幹入","幹他","幹它","幹尼","幹穴","幹她","幹死","幹汝","幹你","幹我","幹牠","幹妳","幹林","幹炮","幹砲","幹勒","幹啦","幹您","幹逼","幹機","幹雞","幹爆","愛液","愛愛","歇逼","群P","群交","群奸","逼毛","逼奸","逼樣","逼癢","嫖娼","嫩b","嫩女","嫩奶","嫩穴","嫩屄","嫩逼","嫩鮑","嫩縫","摳穴","漏逼","瘋狗","精液","緊穴","舔B","舔奶","舔穴","舔屄","舔腳","舔逼","蜜穴","蜜洞","裸陪","裹本","誘姦","豪乳","噴精","墮淫","暴奸","暴乳","暴淫","暴幹","潮噴","窮逼","豬操","賣比","賣淫","賣騷","賤B","賤人","賤比","賤貨","賤逼","賤種","輪奸","輪暴","輪操","靠北","靠母","靠爸","操b","操比","操他","操穴","操她","操死","操你","操我","操妳","操妻","操屄","操射","操爽","操蛋","操腫","操逼","機8","機Y","機Ｙ","機八","機巴","機叭","機芭","機掰","激插","蕩女","蕩妹","蕩婦","龜公","濕穴","濫B","濫比","濫交","濫貨","濫逼","雜交","雜種","雞８","雞Y","雞Ｙ","雞八","雞巴","雞叭","雞奸","雞吧","雞芭","雞掰","顏射","顏騎","懶叫","懶教","爆操","獸交","獸奸","癟三","癡乳","鶏8","鶏八","鶏女","鶏巴","鶏奸","鶏吧","鶏院","罌粟","騷B","騷女","騷水","騷包","騷母","騷穴","騷卵","騷乳","騷妹","騷妻","騷屄","騷洞","騷浪","騷貨","騷棍","騷棒","騷逼","騷鶏","爛b","爛比","爛袋","爛貨","爛逼","蘚鮑","覽叫","露B","露穴","露屄","露逼","鷄巴","豔乳","尻","屄","肏","娼","腚","緄","劌","賤","賫","鋝","蕆","閶","闃","囅"]
};

export function wordFilter(word:string, languages:string[]){

	var isBad = false;
	for(var i = 0; i < languages.length; i++){
		console.log(languages[i]);
		let badWords:string[] = db[languages[i]];
		if(badWords){
			for(var j = 0; j < badWords.length; j++){
				if(word.toLowerCase().indexOf(badWords[j]) >= 0){
					isBad = true;
					break;
				}
			}
		}
		if(isBad){
			break;
		}
	}
	return isBad;
}

export function returnForm(data) {
	return {
		code: 200,
		result: data
	}
}

export function getLang(lang:string){	
	if(LANGUAGE[lang]){
		return LANGUAGE[lang]
   	}else{
		return LANGUAGE['id']
   	}
}

export function sendEmail(toEmail:string, fromEmail:string, subject:string, contetns:string){
	const nodemailer = require('nodemailer');

	let transporter = nodemailer.createTransport({
		service: 'hiworks',
		host: 'smtps.hiworks.com', 
		port: 465,
		secure: true,//ssl사용
		auth: {
			user: 'no_reply@wowboxapp.com', 
			pass: 'fnxm37foqtm@11',
		},
	 });

	 const message = {
		from: fromEmail, // 보내는 사람
		to: toEmail, // 받는 사람 이름과 이메일 주소
		subject: subject, // 메일 제목
		html: contetns
	   };

	transporter.sendMail(message, (err, res) => {
		if (err) {
			console.log('failed... => ', err);
		} else {
		   console.log('succeed... => ', res);
		}
	   
		transporter.close();
	});
}

export function authMail(language:string, authNumber:string) : string{
	return `<!DOCTYPE html>
	<html lang="ko">
	
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>이메일</title>
		<style>
			* {
				box-sizing: border-box;
			}
	
			body {
				margin: 0;
				padding: 0;
			}
	
			a {
				color: #101010 !important;
				text-decoration: none;
			}
	
			p {
				line-height: inherit
			}
	
			@media (max-width:620px) {
	
				.row-content {
					width: 100% !important;
				}
	
				.stack .column {
					width: 100%;
					display: block;
				}
	
				.column-2 {
					padding-top: 10px;
				}
	
			}
		</style>
		
	</head>
	
	<body>
		<table style="background-color: #fff;" width="100%;">
			<tbody>
				<tr>
					<td>
						<!-- 공통헤더 -->
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="row"
							style="background-color: #fafafa;" width="100%">
							<tbody>
								<tr>
									<td>
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="row-content stack"
											style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #101010; padding: 0 20px; color: #000000;  max-width: 600px; width: 100%; margin: 0 auto;">
											<tbody>
												<tr>
													<td class="column"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; height: 70px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; width: 80px;">
														<img src=" https://cdn.wowboxapp.com/emailImage/logo.png" alt="로고"
															style="width: 100%; display: block;">
	
													</td>
													<td></td>
													<td style="width: 50px; vertical-align: middle; height: 70px;">
														<a href="https://play.google.com/store/apps/details?id=com.lejel.wowbox" style="display: block; width: 50px;">
															<img src="https://cdn.wowboxapp.com/emailImage/btn_g.png" alt="구글플레이 이동"
																style="width: 100%; display: block;">
														</a>
													</td>
													<td
														style="width: 62px; padding-left: 12px; vertical-align: middle; height: 70px;">
														<a href="https://itunes.apple.com/app/id6499244720" style="display: block; width: 50px;">
															<img src="https://cdn.wowboxapp.com/emailImage/btn_a.png" alt="앱스토어 이동"
																style="width: 100%; display: block;">
														</a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="row"
							style="background-color: #fafafa;" width="100%">
							<tbody>
								<tr>
									<td>
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="row-content stack"
											style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; padding: 0 20px; color: #000000;  max-width: 600px; width: 100%; margin: 0 auto;">
											<tbody>
												<tr>
													<td class="column"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-top: 30px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
														width="100%">
														<table border="0" cellpadding="10" cellspacing="0"
															style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
															width="100%">
															<tr>
																<td style="padding: 0;">
																	<h1
																		style=" color: #101010;    font-family:applegothic,sans-serif;
																	font-size: 24px; font-weight:bold; letter-spacing: normal; text-align: left; margin-top: 0; margin-bottom: 0;">
																		<span>WOWBOX</span>
																	</h1>
																</td>
															</tr>
														</table>
														<table border="0" cellpadding="10" cellspacing="0" width="100%">
															<tr>
																<td
																	style="padding-top: 20px; padding-left: 0; padding-right: 0; ">
																	<p style="color: #101010;   font-family: 돋움,dotum,applegothic,sans-serif;
																	font-size:14px; font-weight:bold;line-height:120%;text-align:left; margin: 0;">
																		${getLang('id').authMailContents1}
																	</p>
																</td>
															</tr>
														</table>
														<table border="0" cellpadding="10" cellspacing="0"
															class="divider_block" width="100%">
															<tr>
																<td style="padding-top:32px ; padding-left: 0;
																padding-right: 0; padding-bottom: 0;">
																	<div align="center">
																		<table border="0" cellpadding="0" cellspacing="0"
																			width="100%">
																			<tr>
																				<td class="divider_inner"
																					style="font-size: 1px;  border-top: 1px solid #E1E1E1;">
																					<span> </span>
																				</td>
																			</tr>
																		</table>
																	</div>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<!-- 이메일 내용 영역  -->
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="row"
							style="background-color: #fafafa;" width="100%">
							<tbody>
								<tr>
									<td>
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="row-content stack" role="presentation"
											style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; max-width: 600px; width: 100%;  margin: 0 auto; padding: 32px 20px;">
											<tbody>
												<tr>
													<td>
														<p
															style="color: #101010;   font-family: 돋움,dotum,applegothic,sans-serif;
														font-size:14px; font-weight:400;line-height:140%;text-align:left; margin: 0;">
															${getLang('id').authMailContents2}
															<br><br>
															${getLang('id').authMailContents3}
														</p>
													</td>
												</tr>
												<!-- 인증번호 -->
												<tr>
													<td style="padding:  20px;">
														<table align="center" border="0" cellpadding="0" cellspacing="0"
															class="row-content stack" role="presentation"
															style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border: 1px solid #F1F1F1; color: #101010; max-width: 600px; width: 100%;  margin: 0 auto; padding: 10px 16px;">
															<tbody>
																<tr>
																	<td align="center" style="width: calc(100% - 40px);">
																		<span style="display: block; color: #101010;   font-family: 돋움,dotum,applegothic,sans-serif;
																		font-size:16px; font-weight:bold; text-align: center;">
																			${authNumber}
																		</span>
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
	
												</tr>
												<!-- 인증번호 -->
												<tr>
													<td>
														<p style="color: #101010;   font-family: 돋움,dotum,applegothic,sans-serif;
														font-size:14px; font-weight:400;line-height:140%;text-align:left; margin: 0;">
															${getLang('id').authMailContents4}
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
	
							</tbody>
						</table>
						<!-- (공통영역) 이메일템플릿 Footer영역 -->
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="row"
							style="background-color: #fafafa; padding-bottom: 30px;" width="100%">
							<tbody>
								<tr>
									<td>
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="row-content stack"
											style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; padding: 0 20px; color: #000000;  max-width: 600px; width: 100%; margin: 0 auto;">
											<tbody>
												<tr>
													<td style="padding-top:32px ; padding-left: 0;
											padding-right: 0; padding-bottom: 32px;">
														<div align="center">
															<table border="0" cellpadding="0" cellspacing="0" width="100%">
																<tr>
																	<td class="divider_inner"
																		style="font-size: 1px;  border-top: 1px solid #E1E1E1;">
																		<span> </span>
																	</td>
																</tr>
															</table>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<p style="font-family: 돋움,dotum,applegothic,sans-serif; font-size: 12px; font-weight: 400; margin: 0; margin-bottom: 0px; display:block; line-height: 135%; margin-top: 0; padding-left: 0;
															padding-right: 0; color: #767676;">
															${getLang('id').authMailContents5}
														</p>
													</td>
												</tr>
												<tr>
													<td style="padding-top: 24px; padding-bottom: 30px; padding-left: 0;
													padding-right: 0;">
														<p
															style="font-family: 돋움,dotum,applegothic,sans-serif; font-size: 12px; font-weight: 400; margin-bottom: 6px; display:block; line-height: 135%; margin-top: 0; color: #767676;">
															Copyright WOWBOX Corporation. All right reserved.
														</p>
													</td>
												</tr>
											</tbody>
										</table>
	
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
		</td>
		</tr>
		</tbody>
		</table>
	</body>
	
	</html>`;
}

export function partnerMail(language:string) : string{
	return `<!DOCTYPE html>
	<html lang="ko">
	
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>이메일</title>
		<style>
			* {
				box-sizing: border-box;
			}
	
			body {
				margin: 0;
				padding: 0;
			}
	
			a {
				color: #101010 !important;
				text-decoration: none;
			}
	
			p {
				line-height: inherit
			}
	
			@media (max-width:620px) {
	
	
				.row-content {
					width: 100% !important;
				}
	
				.stack .column {
					width: 100%;
					display: block;
				}
	
				.column-2 {
					padding-top: 10px;
				}
	
	
			}
		</style>
	</head>
	
	<body>
		<table style="background-color: #fff;" width="100%;">
			<tbody>
				<tr>
					<td>
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="row"
							style="background-color: #fafafa;" width="100%">
							<tbody>
								<tr>
									<td>
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="row-content stack"
											style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #101010; padding: 0 20px; color: #000000;  max-width: 600px; width: 100%; margin: 0 auto;">
											<tbody>
												<tr>
													<td class="column"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; height: 70px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; width: 80px;">
														<img src=" https://cdn.wowboxapp.com/emailImage/logo.png" alt="로고"
															style="width: 100%; display: block;">
	
													</td>
													<td></td>
													<td style="width: 50px; vertical-align: middle; height: 70px;">
														<a href="https://play.google.com/store/apps/details?id=com.lejel.wowbox" style="display: block; width: 50px;">
															<img src="https://cdn.wowboxapp.com/emailImage/btn_g.png" alt="구글플레이 이동"
																style="width: 100%; display: block;">
														</a>
													</td>
													<td
														style="width: 62px; padding-left: 12px; vertical-align: middle; height: 70px;">
														<a href="https://itunes.apple.com/app/id6499244720" style="display: block; width: 50px;">
															<img src="https://cdn.wowboxapp.com/emailImage/btn_a.png" alt="앱스토어 이동"
																style="width: 100%; display: block;">
														</a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="row"
							style="background-color: #fafafa;" width="100%">
							<tbody>
								<tr>
									<td>
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="row-content stack"
											style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; padding: 0 20px; color: #000000;  max-width: 600px; width: 100%; margin: 0 auto;">
											<tbody>
												<tr>
													<td class="column"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-top: 30px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
														width="100%">
														<table border="0" cellpadding="10" cellspacing="0"
															style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
															width="100%">
															<tr>
																<td style="padding: 0;">
																	<h1
																		style=" color: #101010;    font-family:applegothic,sans-serif;
																	font-size: 24px; font-weight:bold; letter-spacing: normal; text-align: left; margin-top: 0; margin-bottom: 0;">
																		<span>WOWBOX</span>
																	</h1>
																</td>
															</tr>
														</table>
														<table border="0" cellpadding="10" cellspacing="0" width="100%">
															<tr>
																<td
																	style="padding-top: 20px; padding-left: 0; padding-right: 0; ">
																	<p
																		style="color: #101010;   font-family: 돋움,dotum,applegothic,sans-serif;
																	font-size:14px; font-weight:bold;line-height:120%;text-align:left; margin: 0;">
																		${getLang('id').partnerMailContents1}
																	</p>
																</td>
															</tr>
														</table>
														<table border="0" cellpadding="10" cellspacing="0"
															class="divider_block" width="100%">
															<tr>
																<td style="padding-top:32px ; padding-left: 0;
																padding-right: 0; padding-bottom: 0;">
																	<div align="center">
																		<table border="0" cellpadding="0" cellspacing="0"
																			width="100%">
																			<tr>
																				<td class="divider_inner"
																					style="font-size: 1px;  border-top: 1px solid #E1E1E1;">
																					<span> </span>
																				</td>
																			</tr>
																		</table>
																	</div>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<!-- 이메일 내용 영역 -->
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="row"
							style="background-color: #fafafa;" width="100%">
							<tbody>
								<!-- 1. 신분증(여권) 파일  -->
								<tr>
									<td>
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="row-content stack" role="presentation"
											style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; max-width: 600px; width: 100%;  margin: 0 auto; padding: 32px 20px;">
											<tbody>
												<tr>
													<td class="column"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; width: 86px;"
														width="86">
														<table border="0" cellpadding="0" cellspacing="0"
															class="image_block block-1" role="presentation"
															style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
															width="100%">
															<tbody>
																<tr>
																	<td style="width:100%;">
																		<img src="https://cdn.wowboxapp.com/emailImage/icon_01.png" alt=""
																			style="display: block; height: auto; border: 0; width: 100%; max-width: 62px;">
																	</td>
																</tr>
															</tbody>
														</table>
	
													</td>
													<td class="column column-2"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
														width="calc(100% - 82px)">
														<table border="0" cellpadding="10" cellspacing="0"
															class="text_block block-1" role="presentation"
															style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
															width="100%">
															<tbody>
																<tr>
																	<td style="padding: 0;">
																		<p style="font-family: 돋움,dotum,applegothic,sans-serif; font-size: 14px; font-weight: bold; margin-bottom: 6px; display:block; line-height: 120%; margin-top: 0; color: #101010;">
																			   ${getLang('id').partnerMailContents2}
																		</p>
																		<p style="font-family: 돋움,dotum,applegothic,sans-serif; font-weight:400; margin: 0; display: block; line-height: 120%; margin-top: 0; color: #101010; font-size: 14px;">
																			   ${getLang('id').partnerMailContents3}
																		</p>
																	</td>
																</tr>
															</tbody>
														</table>
	
													</td>
	
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
	
								<!-- 2. 계좌정보   -->
								<tr>
									<td>
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; max-width: 600px; width: 100%;  margin: 0 auto;  padding-top: 0;
											padding-left: 20px;
											padding-right: 20px;
											padding-bottom: 32px;">
											<tbody>
												<tr>
													<td class="column"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; width: 86px;"
														width="86">
														<table border="0" cellpadding="0" cellspacing="0"
															class="image_block block-1" role="presentation"
															style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
															width="100%">
															<tbody>
																<tr>
																	<td style="width:100%;">
																		<img src="https://cdn.wowboxapp.com/emailImage/icon_02.png" alt=""
																			style="display: block; height: auto; border: 0; width: 100%; max-width: 62px;">
																	</td>
																</tr>
															</tbody>
														</table>
	
													</td>
													<td class="column column-2"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
														width="calc(100% - 82px)">
														<table border="0" cellpadding="10" cellspacing="0"
															class="text_block block-1" role="presentation"
															style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
															width="100%">
															<tbody>
																<tr>
																	<td style="padding: 0;">
																		<p style="font-family: 돋움,dotum,applegothic,sans-serif; font-size: 14px; font-weight: bold; margin-bottom: 6px; display:block; line-height: 120%; margin-top: 0; color: #101010; ;">
																		  ${getLang('id').partnerMailContents4}
																		</p>
																		<p style="font-family: 돋움,dotum,applegothic,sans-serif; font-weight:400; margin: 0; display: block; line-height: 120%; margin-top: 0; color: #101010; font-size: 14px; margin: 0;">
																		  ${getLang('id').partnerMailContents5}
																			<br>
																			<span style="display: block; font-size: 12px; font-weight: 400; color: #101010; line-height: 130%;">
																			   ${getLang('id').partnerMailContents6}
																			</span>
																		</p>
																	</td>
																</tr>
															</tbody>
														</table>
	
													</td>
	
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<!-- 3. 연락처  -->
								<tr>
									<td>
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; max-width: 600px; width: 100%;  margin: 0 auto;  padding-top: 0;
											padding-left: 20px;
											padding-right: 20px;
											padding-bottom: 32px;">
											<tbody>
												<tr>
													<td class="column"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px; width: 86px;"
														width="86">
														<table border="0" cellpadding="0" cellspacing="0"
															class="image_block block-1" role="presentation"
															style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
															width="100%">
															<tbody>
																<tr>
																	<td style="width:100%;">
																		<img src="https://cdn.wowboxapp.com/emailImage/icon_03.png" alt=""
																			style="display: block; height: auto; border: 0; width: 100%; max-width: 62px;">
																	</td>
																</tr>
															</tbody>
														</table>
	
													</td>
													<td class="column column-2"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
														width="calc(100% - 82px)">
														<table border="0" cellpadding="10" cellspacing="0"
															class="text_block block-1" role="presentation"
															style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
															width="100%">
															<tbody>
																<tr>
																	<td style="padding: 0;">
																		<p style="font-family: 돋움,dotum,applegothic,sans-serif; font-size: 14px; font-weight: bold; margin-bottom: 6px; display:block; line-height: 120%; margin-top: 0; color: #101010;">
																		  ${getLang('id').partnerMailContents7}
																		</p>
																		<p style="font-family: 돋움,dotum,applegothic,sans-serif; font-weight:400; margin: 0; display: block; line-height: 120%; margin-top: 0; color: #101010; font-size: 14px;">
																		  ${getLang('id').partnerMailContents8}
																		</p>
																	</td>
																</tr>
															</tbody>
														</table>
	
													</td>
	
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<!-- (공통영역) 이메일템플릿 Footer영역 -->
						<table align="center" border="0" cellpadding="0" cellspacing="0" class="row"
							style="background-color: #fafafa; padding-bottom: 30px;" width="100%">
							<tbody>
								<tr>
									<td>
										<table align="center" border="0" cellpadding="0" cellspacing="0"
											class="row-content stack"
											style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; padding: 0 20px; color: #000000;  max-width: 600px; width: 100%; margin: 0 auto;">
											<tbody>
												<tr>
													<td style="padding-top:32px ; padding-left: 0;
											padding-right: 0; padding-bottom: 32px;">
														<div align="center">
															<table border="0" cellpadding="0" cellspacing="0" width="100%">
																<tr>
																	<td class="divider_inner"
																		style="font-size: 1px;  border-top: 1px solid #E1E1E1;">
																		<span> </span>
																	</td>
																</tr>
															</table>
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<p style="font-family: 돋움,dotum,applegothic,sans-serif; font-size: 12px; font-weight: 400; margin: 0; margin-bottom: 0px; display:block; line-height: 135%; margin-top: 0; padding-left: 0; padding-right: 0; color: #767676;">
														   ${getLang('id').partnerMailContents9}
														</p>
													</td>
												</tr>
												<tr>
													<td style="padding-top: 24px; padding-bottom: 30px; padding-left: 0;
													padding-right: 0;">
														<p
															style="font-family: 돋움,dotum,applegothic,sans-serif; font-size: 12px; font-weight: 400; margin-bottom: 6px; display:block; line-height: 135%; margin-top: 0; color: #767676;">
															Copyright WOWBOX Corporation. All right reserved.
														</p>
													</td>
												</tr>
											</tbody>
										</table>
	
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
		</td>
		</tr>
		</tbody>
		</table>
	</body>
	
	</html>`;
}