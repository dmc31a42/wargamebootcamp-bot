
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
const wtf = require('wtf_wikipedia');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const moment = require('moment');

module.exports.wformatting = (index, data, message) => {
  const url = data[3][index];
  data[1][index].trim();
  let input = data[1][index];
  input = input.replace(/[\s+]/g, '_');
  (async () => {;
    var doc = await wtf.fetch(input);
    let doc2 = doc.images();

    let description = '';
    let title = '**' + doc.title + '**';
    doc = doc.json();
    for(let i = 0; i < doc.sections[0].paragraphs[0].sentences.length; i++) {
      description = description +  ' ' + doc.sections[0].paragraphs[0].sentences[i].text;
    }
    let paragraph2 = '';
    if(doc.sections[0].paragraphs[1] !== undefined) {
    for(let i = 0; i < doc.sections[0].paragraphs[1].sentences.length; i++) {
      paragraph2 = paragraph2 + ' ' + doc.sections[0].paragraphs[1].sentences[i].text;
    }
    }
    let fulldescription = description + '\n\n' + paragraph2;
    if(fulldescription.length > 2000) fulldescription.length = 1500;
    fulldescription = fulldescription + '...';

    let image = '';
    if(doc2[0] !== undefined) {
      image = doc2[0].url();
    }
    // console.log(JSON.stringify(doc));
    const embed = new Discord.RichEmbed()
    .setAuthor('Entry for ' + input.replace(/[\_+]/g, ' '), 'https://imgur.com/ab2t4Kh.png')
    .setTitle(data[1][index])
    .setURL(url)
    .setDescription(fulldescription)
    .setThumbnail(image)
    .setColor('WHITE')
    .setFooter('Via wikipedia.com • Today at ' + moment().format('LTS'), 'https://imgur.com/yBUUNmd.png');
    const filter = (reaction, user, member) => { //make a filter of only the reaction wastebasket made by the user
      return ['🗑'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.channel.send(embed).then(m => {
      m.react('🗑');
      m.awaitReactions(filter, {
          max: 1,
          time: 7000,
          errors: ['Time'],
        })
        .then(collected => {
          const reaction = collected.first();
          if (reaction.emoji.name === '🗑') {
            m.delete().then(() => {
                message.delete(message).catch(err => { });
            });
          }
        }).catch(err => {
          m.clearReactions().catch(err => {});
        });
    });
    })();

};

module.exports.formatting = (i) => {

  if (i.Name === '') {
    return;
  }


  i.Weapon2Type = i.Weapon2Type.replaceAll('LAW', 'AT');
  i.Weapon3Type = i.Weapon3Type.replaceAll('LAW', 'AT');

  // i.Name = i.Name.replaceAll('%', ' ');

  let weapon1round;
  let weapon2round;
  let weapon3round;
  let weapon4round;
  let weapon5round;
  let weapon6round;
  let weapon7round;
  let weapon8round;

  let proto;

  let armorfront;
  let armorsides;
  let armorrear;
  let armortop;

  const weapon1rof = Math.round(60 * i.Weapon1ShotsPerSalvo / ((i.Weapon1ShotsPerSalvo - 1) * i.Weapon1TimeBetweenShots - -i.Weapon1TimeBetweenSalvos));
  const weapon2rof = Math.round(60 * i.Weapon2ShotsPerSalvo / ((i.Weapon2ShotsPerSalvo - 1) * i.Weapon2TimeBetweenShots - -i.Weapon2TimeBetweenSalvos));
  const weapon3rof = Math.round(60 * i.Weapon3ShotsPerSalvo / ((i.Weapon3ShotsPerSalvo - 1) * i.Weapon3TimeBetweenShots - -i.Weapon3TimeBetweenSalvos));
  const weapon4rof = Math.round(60 * i.Weapon4ShotsPerSalvo / ((i.Weapon4ShotsPerSalvo - 1) * i.Weapon4TimeBetweenShots - -i.Weapon4TimeBetweenSalvos));
  const weapon5rof = Math.round(60 * i.Weapon5ShotsPerSalvo / ((i.Weapon5ShotsPerSalvo - 1) * i.Weapon5TimeBetweenShots - -i.Weapon5TimeBetweenSalvos));
  const weapon6rof = Math.round(60 * i.Weapon6ShotsPerSalvo / ((i.Weapon6ShotsPerSalvo - 1) * i.Weapon6TimeBetweenShots - -i.Weapon6TimeBetweenSalvos));
  const weapon7rof = Math.round(60 * i.Weapon7ShotsPerSalvo / ((i.Weapon7ShotsPerSalvo - 1) * i.Weapon7TimeBetweenShots - -i.Weapon7TimeBetweenSalvos));
  const weapon8rof = Math.round(60 * i.Weapon8ShotsPerSalvo / ((i.Weapon8ShotsPerSalvo - 1) * i.Weapon8TimeBetweenShots - -i.Weapon8TimeBetweenSalvos));

  let rookieavail = ('<:unvet1:583396237936427039>' + i.RookieDeployableAmount + '   ');
  let trainedavail = ('<:unvet2:583396237655670825>' + i.TrainedDeployableAmount + '   ');
  let hardenedavail = ('<:unvet3:583396237626048517>' + i.HardenedDeployableAmount + '   ');
  let veteranavail = ('<:unvet4:583396237550813229>' + i.VeteranDeployableAmount + '   ');
  let eliteavail = ('<:unvet5:583396237601013779>' + i.EliteDeployableAmount + '   ');


  const redfor = {


    "Poland": ":flag_pl:",
    'Czechoslavakia': ':flag_cz:',
    'Soviet Union': '<:flag_sr:581691631523069952>',
    'Yugoslavia': '<:emote:581895502568620110>',
    'Finland': ':flag_fi:',
    'East Germany': '<:unknown:581897376000638996>',
    'China': ':flag_cn:',
    'North Korea': '<:download:581897628959375372>',

  };

  const blufor = {

    "France": ":flag_fr:",
    'Canada': ':flag_ca:',
    'Sweden': ':flag_se:',
    'The Netherlands': ':flag_nl:',
    'ANZAC': ':flag_au:',
    'Israel': ':flag_il:',
    'United Kingdom': ':flag_gb:',
    'Japan': ':flag_jp:',
    'United States': ':flag_us:',
    'West Germany': ':flag_de:',
    'Denmark': ':flag_dk:',
    'South Korea': ':flag_kr:',
    'Norway': ':flag_no:',

  };

  const stealth = {
    '1': '떨어짐',
    '1.25': 'Poor - Medium',
    '1.5': '보통',
    '2': '좋음',
    '2.5': '아주좋음',
    '3': '뛰어남',
  };

  const groundOptics = {
    '40': '나쁨',
    '60': '떨어짐',
    '80': '보통',
    '120': '좋음',
    '170': '아주좋음',
    '220': '뛰어남',
  };


  if (groundOptics.hasOwnProperty(i.OpticalStrengthGround)) {
    i.OpticalStrengthGround = groundOptics[i.OpticalStrengthGround];
  }

  if (stealth.hasOwnProperty(i.Stealth)) {
    i.Stealth = stealth[i.Stealth];
  }

  if (blufor.hasOwnProperty(i.MotherCountry)) {
    i.MotherCountry = blufor[i.MotherCountry];
    color = "BLUE";
  } else if (redfor.hasOwnProperty(i.MotherCountry)) {
    i.MotherCountry = redfor[i.MotherCountry];
    color = "RED";
  }

  if (i.Weapon1HE < 1) {
    weapon1round = i.Weapon1HE;
  } else {
    weapon1round = Math.trunc(i.Weapon1HE);
  };

  if (i.Weapon2HE < 1) {
    weapon2round = i.Weapon2HE;
  } else {
    weapon2round = Math.trunc(i.Weapon2HE);
  };

  if (i.Weapon3HE < 1) {
    weapon3round = i.Weapon3HE;
  } else {
    weapon3round = Math.trunc(i.Weapon3HE);
  };

  if (i.Weapon4HE < 1) {
    weapon4round = i.Weapon4HE;
  } else {
    weapon4round = Math.trunc(i.Weapon4HE);
  };

  if (i.Weapon5HE < 1) {
    weapon5round = i.Weapon5HE;
  } else {
    weapon5round = Math.trunc(i.Weapon5HE);
  };

  if (i.Weapon6HE < 1) {
    weapon6round = i.Weapon6HE;
  } else {
    weapon6round = Math.trunc(i.Weapon6HE);
  };

  if (i.Weapon7HE < 1) {
    weapon7round = i.Weapon7HE;
  } else {
    weapon7round = Math.trunc(i.Weapon7HE);
  };

  if (i.Weapon8HE < 1) {
    weapon8round = i.Weapon8HE;
  } else {
    weapon8round = Math.trunc(i.Weapon8HE);
  };



  if (i.ArmorFrontSplashResistant.toLowerCase() === 'true') {
    armorfront = '0';
  } else {
    armorfront = i.ArmorFront;
  }
  if (i.ArmorSidesSplashResistant.toLowerCase() === 'true') {
    armorsides = '0';
  } else {
    armorsides = i.ArmorSides;
  }
  if (i.ArmorRearSplashResistant.toLowerCase() === 'true') {
    armorrear = '0';
  } else {
    armorrear = i.ArmorRear;
  }
  if (i.ArmorTopSplashResistant.toLowerCase() === 'true') {
    armortop = '0';
  } else {
    armortop = i.ArmorTop;
  }

  if (i.IsPrototype.toLowerCase() === 'false') {
    proto = '**시제병력 아님**';
  } else if (i.IsPrototype.toLowerCase() === 'true') {
    proto = '**시제병력**';
  }

  if (i.RookieDeployableAmount !== '0') {
    rookieavail = ('<:vet1:583396237936689155> **' + i.RookieDeployableAmount + '**   ');
  };
  if (i.TrainedDeployableAmount !== '0') {
    trainedavail = ('<:vet2:583396237735362593> **' + i.TrainedDeployableAmount + '**   ');
  };
  if (i.HardenedDeployableAmount !== '0') {
    hardenedavail = ('<:vet3:583396237890551808> **' + i.HardenedDeployableAmount + '**   ');
  };
  if (i.VeteranDeployableAmount !== '0') {
    veteranavail = ('<:vet4:583396237873643529> **' + i.VeteranDeployableAmount + '**   ');
  };
  if (i.EliteDeployableAmount !== '0') {
    eliteavail = ('<:vet5:583396238053867558> **' + i.EliteDeployableAmount + '**   ');
  };

  // the dude that made the final data csv bungled the helo range for autocannons

  if (i.Weapon1Type == 'Autocannon' && Math.trunc(i.Weapon1RangeGround) > 1575) {
    i.Weapon1RangeHelicopters = i.Weapon1RangeGround - 175;
  } else if (i.Weapon1Type == 'Autocannon' && Math.trunc(i.Weapon1RangeGround) <= 1575) {
    i.Weapon1RangeHelicopters = i.Weapon1RangeGround;
  }
  if (i.Weapon2Type == 'Autocannon' && Math.trunc(i.Weapon2RangeGround) > 1575) {
    i.Weapon2RangeHelicopters = i.Weapon2RangeGround - 175;
  } else if (i.Weapon2Type == 'Autocannon' && Math.trunc(i.Weapon2RangeGround) <= 1575) {
    i.Weapon2RangeHelicopters = i.Weapon2RangeGround;
  }
  if (i.Weapon3Type == 'Autocannon' && Math.trunc(i.Weapon3RangeGround) > 1575) {
    i.Weapon3RangeHelicopters = i.Weapon3RangeGround - 175;
  } else if (i.Weapon3Type == 'Autocannon' && Math.trunc(i.Weapon3RangeGround) <= 1575) {
    i.Weapon3RangeHelicopters = i.Weapon3RangeGround;
  }

  //defaults

  let title = ('**' + i.Name.toUpperCase() + ('%', ' ') + '**');

  let availability = (rookieavail + trainedavail + hardenedavail + veteranavail + eliteavail);

  let accuracy = (+' | **명중률**: ' + Math.trunc(i.Weapon1HitProbability * 100) + '%');

  if (i.Weapon1HitProbability === '') {
    accuracy = '';
  };

  let description = ('**가격**: ' + i.Price + ' | **장갑: ** 전면: ' + armorfront + ' | 측면: ' + armorsides + ' | 후면: ' + armorrear + ' | 상면: ' + armortop);

  let category = ('**** | **국가**: ' + i.MotherCountry + ' | ' + proto);

  let movement = ('**이동수단**', '**유형**: ' + i.MovementType + ' | **속도**: ' + Math.trunc(i.MaxSpeed) + 'kph | **은밀성**: ' + i.Stealth + ' \n **광학장비**: ' + i.OpticalStrengthGround);

  let weapon1 = ('**무장 1**: ' + i.Weapon1Name + ', ' + i.Weapon1Caliber + ' x' + Math.trunc(i.Weapon1DisplayedAmmunition) + ', ** ' + i.Weapon1Tags + '** | **사정거리*: 지상: ' + Math.trunc(i.Weapon1RangeGround) + ' - ' + Math.trunc(i.Weapon1RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon1RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon1RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon1DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon1DispersionAtMaxRange) + ' | **장갑관통력**: ' + i.Weapon1AP + ' | **고폭위력**: ' + weapon1round + ' | **살보(클립크기)**: ' + Math.trunc(i.Weapon1ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon1SupplyCost) + ' | **발사속도**: ' + weapon1rof + ' | **명중률**: ' + Math.trunc(i.Weapon1HitProbability * 100) + '%');

  let weapon2 = ('**무장 2**: ' + i.Weapon2Name + ', ' + i.Weapon2Caliber + ' x' + Math.trunc(i.Weapon2DisplayedAmmunition) + ', ** ' + i.Weapon2Tags + '** | **사정거리*: 지상: ' + Math.trunc(i.Weapon2RangeGround) + ' - ' + Math.trunc(i.Weapon2RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon2RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon2RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon2DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon2DispersionAtMaxRange) + ' | **장갑관통력**: ' + i.Weapon2AP + ' | **고폭위력**: ' + weapon2round + ' | **살보**: ' + Math.trunc(i.Weapon2ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon2SupplyCost) + '  | **발사속도**: ' + weapon2rof + ' | **명중률**: ' + Math.trunc(i.Weapon2HitProbability * 100) + '%');

  let weapon3 = ('**무장 3**: ' + i.Weapon3Name + ', ' + i.Weapon3Caliber + ' x' + Math.trunc(i.Weapon3DisplayedAmmunition) + ', ** ' + i.Weapon3Tags + '** | **사정거리*: 지상: ' + Math.trunc(i.Weapon3RangeGround) + ' - ' + Math.trunc(i.Weapon3RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon3RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon3RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon3DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon3DispersionAtMaxRange) + ' | **장갑관통력**: ' + i.Weapon3AP + ' | **고폭위력**: ' + weapon3round + ' | **살보**: ' + Math.trunc(i.Weapon3ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon3SupplyCost) + '  | **발사속도**: ' + weapon3rof + ' | **명중률**: ' + Math.trunc(i.Weapon3HitProbability * 100) + '%');

  let weapon4 = ('**무장 4**: ' + i.Weapon4Name + ', ' + i.Weapon4Caliber + ' x' + Math.trunc(i.Weapon4DisplayedAmmunition) + ', ** ' + i.Weapon4Tags + '** | **사정거리*: 지상: ' + Math.trunc(i.Weapon4RangeGround) + ' - ' + Math.trunc(i.Weapon4RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon4RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon4RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon4DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon4DispersionAtMaxRange) + ' | **장갑관통력**: ' + i.Weapon4AP + ' | **고폭위력**: ' + weapon4round + ' | **살보**: ' + Math.trunc(i.Weapon4ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon4SupplyCost) + '  | **발사속도**: ' + weapon4rof + ' | **명중률**: ' + Math.trunc(i.Weapon4HitProbability * 100) + '%');

  let weapon5 = ('**무장 5**: ' + i.Weapon5Name + ', ' + i.Weapon5Caliber + ' x' + Math.trunc(i.Weapon5DisplayedAmmunition) + ', ** ' + i.Weapon5Tags + '** | **사정거리*: 지상: ' + Math.trunc(i.Weapon5RangeGround) + ' - ' + Math.trunc(i.Weapon5RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon5RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon5RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon5DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon5DispersionAtMaxRange) + ' | **장갑관통력**: ' + i.Weapon4AP + ' | **고폭위력**: ' + weapon5round + ' | **살보**: ' + Math.trunc(i.Weapon5ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon5SupplyCost) + '  | **발사속도**: ' + weapon5rof + ' | **명중률**: ' + Math.trunc(i.Weapon5HitProbability * 100) + '%');

  let weapon6 = ('**무장 6**: ' + i.Weapon6Name + ', ' + i.Weapon6Caliber + ' x' + Math.trunc(i.Weapon6DisplayedAmmunition) + ', ** ' + i.Weapon6Tags + '** | **사정거리*: 지상: ' + Math.trunc(i.Weapon6RangeGround) + ' - ' + Math.trunc(i.Weapon6RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon6RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon6RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon6DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon6DispersionAtMaxRange) + ' | **장갑관통력**: ' + i.Weapon4AP + ' | **고폭위력**: ' + weapon6round + ' | **살보**: ' + Math.trunc(i.Weapon6ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon6SupplyCost) + '  | **발사속도**: ' + weapon6rof + ' | **명중률**: ' + Math.trunc(i.Weapon6HitProbability * 100) + '%');

  let weapon7 = ('**무장 7**: ' + i.Weapon7Name + ', ' + i.Weapon7Caliber + ' x' + Math.trunc(i.Weapon7DisplayedAmmunition) + ', ** ' + i.Weapon7Tags + '** | **사정거리*: 지상: ' + Math.trunc(i.Weapon7RangeGround) + ' - ' + Math.trunc(i.Weapon7RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon7RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon7RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon7DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon7DispersionAtMaxRange) + ' | **장갑관통력**: ' + i.Weapon4AP + ' | **고폭위력**: ' + weapon7round + ' | **살보**: ' + Math.trunc(i.Weapon7ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon7SupplyCost) + '  | **발사속도**: ' + weapon7rof + ' | **명중률**: ' + Math.trunc(i.Weapon7HitProbability * 100) + '%');

  let weapon8 = ('**무장 8**: ' + i.Weapon8Name + ', ' + i.Weapon8Caliber + ' x' + Math.trunc(i.Weapon8DisplayedAmmunition) + ', ** ' + i.Weapon8Tags + '** | **사정거리*: 지상: ' + Math.trunc(i.Weapon8RangeGround) + ' - ' + Math.trunc(i.Weapon8RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon8RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon8RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon8DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon8DispersionAtMaxRange) + ' | **장갑관통력**: ' + i.Weapon4AP + ' | **고폭위력**: ' + weapon8round + ' | **살보**: ' + Math.trunc(i.Weapon8ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon8SupplyCost) + '  | **발사속도**: ' + weapon8rof + ' | **명중률**: ' + Math.trunc(i.Weapon8HitProbability * 100) + '%');

  // if(i.Weapon2Type == 'AT' && i.Training !== '' && i.Weapon3Name == '') {
  //    title = ('**' + i.Name.toUpperCase() + '**' + '    <:nato_at_infantry:583701946477576192>');
  // } else if (i.Weapon2Type == 'SAM' && i.Training !== '' && i.Weapon3Name == '') {
  //    title = ('**' + i.Name.toUpperCase() + '**' + '    <:nato_aa_sam_infantry:583703304974893093>');
  // } else if (i.Weapon2Type == 'Flamethrower' && i.Training !== '' && i.Weapon3Name == '') {
  //    title = ('**' + i.Name.toUpperCase() + '**' + '    <:nato_flame_infantry:583703448567152672>');
  // } else if (i.Weapon2Type == 'Flamethrower' && i.Training !== '' && i.Weapon3Name == '') {
  //    title = ('**' + i.Name.toUpperCase() + '**' + '    <:nato_flame_infantry:583703448567152672>');
  // }


  //specialized formatting

  if (i.Tab === 'LOG') { //logistics tab formatting
    if (i.SupplyCapacity === '') {
      title = ('**' + i.Name.toUpperCase() + '**' + ' <:command:583070567301644290>');
    } //if its a cv, give it the cv icon

    category = ('**Logistics** | **국가**: ' + i.MotherCountry + ' | ' + proto);
    if (i.Training !== '') {
      movement = ('**이동수단**', '**유형**: ' + i.MovementType + ' | **속도**: ' + Math.trunc(i.MaxSpeed) + 'kph | **은밀성**: ' + i.Stealth + ' \n **광학장비**: ' + i.OpticalStrengthGround + ' | **숙련도**: ' + i.Training);
      description = ('**Price**: ' + i.Price);
    }
    if (armorfront == 'none' && armorsides == 'none' && armorrear == 'none' && armortop == 'none') {
      description = ('**가격**: ' + i.Price + ' | **장갑**: Splash');
    }
    if (i.SupplyCapacity !== '') {
      category = ('**보급** | **보급 능력**: ' + i.SupplyCapacity + ' | **국가**: ' + i.MotherCountry + ' | ' + proto);
    }

  } else if (i.Tab === 'INF') {
    category = ('**보병** | **국가**: ' + i.MotherCountry + ' | ' + proto);
    description = ('**가격**: ' + i.Price);
    movement = ('**이동수단**', '**유형**: ' + i.MovementType + ' | **속도**: ' + Math.trunc(i.MaxSpeed) + 'kph | **은밀성**: ' + i.Stealth + ' \n **광학장비**: ' + i.OpticalStrengthGround + ' | **숙련도**: ' + i.Training);
    weapon1 = ('**무장 1**: ' + i.Weapon1Name + ', ' + i.Weapon1Caliber + ' x' + Math.trunc(i.Weapon1DisplayedAmmunition) + ', ** ' + i.Weapon1Tags + '** | **사정거리**: 지상: ' + Math.trunc(i.Weapon1RangeGround) + ' - ' + Math.trunc(i.Weapon1RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon1RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon1RangePlanes) + ' | **장갑 관통력**: ' + i.Weapon1AP + ' | **고폭 위력**: ' + weapon1round + ' | **살보(클립크기)**: ' + Math.trunc(i.Weapon1ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon1SupplyCost) + '  | **발사속도**: ' + weapon1rof + ' | **안정장치**: ' + Math.trunc(i.Weapon1HitProbability * 100) + '%');

    weapon2 = ('**무장 2**: ' + i.Weapon2Name + ', ' + i.Weapon2Caliber + ' x' + Math.trunc(i.Weapon2DisplayedAmmunition) + ', ** ' + i.Weapon2Tags + '** | **사정거리**: 지상: ' + Math.trunc(i.Weapon2RangeGround) + ' - ' + Math.trunc(i.Weapon2RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon2RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon2RangePlanes) + ' | **장갑 관통력**: ' + i.Weapon2AP + ' | **고폭 위력**: ' + weapon2round + ' | **살보**: ' + Math.trunc(i.Weapon2ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon2SupplyCost) + '  | **발사속도**: ' + weapon2rof + ' | **안정장치**: ' + Math.trunc(i.Weapon2HitProbability * 100) + '%');

    weapon3 = ('**무장 3**: ' + i.Weapon3Name + ', ' + i.Weapon3Caliber + ' x' + Math.trunc(i.Weapon3DisplayedAmmunition) + ', ** ' + i.Weapon3Tags + '** | **사정거리**: 지상: ' + Math.trunc(i.Weapon3RangeGround) + ' - ' + Math.trunc(i.Weapon3RangeGroundMinimum) + ', 헬리콥터: ' + Math.trunc(i.Weapon3RangeHelicopters) + ', 항공기: ' + Math.trunc(i.Weapon3RangePlanes) + ' | **장갑 관통력**: ' + i.Weapon3AP + ' | **고폭 위력**: ' + weapon3round + ' | **살보**: ' + Math.trunc(i.Weapon3ShotsPerSalvo) + ' Shots | **보급량**: 살보 당' + Math.trunc(i.Weapon3SupplyCost) + '  | **발사속도**: ' + weapon3rof + ' | **안정장치**: ' + Math.trunc(i.Weapon3HitProbability * 100) + '%');

  } else if (i.Tab === 'SUP') {
    category = ('**지원** | **국가**: ' + i.MotherCountry + ' | ' + proto);
    if (i.Weapon1Caliber.includes('Radar') && weapon1rof > 30) {
      title = title + ' <:nato_aa_flak_vehicle_rad:583815605442969600>';

    }
    if (!i.Weapon1Caliber.includes('Radar') && weapon1rof > 30) {
      title = title + ' <:nato_aa_flak_vehicle:583815605547696131>';

    }
  } else if (i.Tab === 'TNK') {
    category = ('**전차** | **국가**: ' + i.MotherCountry + ' | ' + proto);
    if (i.Weapon1ShotsPerSalvo == i.Weapon1DisplayedAmmunition) {
      category = category + ' | **AUTOLOADED**';

    }

  } else if (i.Tab === 'REC') {
    category = ('**정찰** | **국가**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'VHC') {
    category = ('**차량** | **국가**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'HEL') {
    category = ('**헬리콥터** | **국가**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'PLA') {

    const airOptics = {
      '150': '좋음 (150)',
      '300': '아주 좋음 (300)',
      '450': '뛰어남 (450)',
      '900': '뛰어남 + (900)',
    };
    if (airOptics.hasOwnProperty(i.OpticalStrengthAir)) {
      i.OpticalStrengthAir = airOptics[i.OpticalStrengthAir];
    }

    description = ('**가격**: ' + i.Price);
    if (i.Name === 'A-10A THUNDERBOLT II' || i.Name === 'Su-25T') {
      description = ('**가격**: ' + i.Price + ' | **장갑: ** 전면: ' + armorfront + ' | 측면: ' + armorsides + ' | 후면: ' + armorrear + ' | 상면: ' + armortop);
    }

    category = ('**항공기** | **국가**: ' + i.MotherCountry + ' | ' + proto);
    movement = ('**이동수단**', '**유형**: ' + i.MovementType + ' | **Speed**: ' + Math.trunc(i.MaxSpeed) + 'kph | **Stealth**: ' + i.Stealth + ' \n **Air Optics**: ' + i.OpticalStrengthAir);
    if (i.Weapon1Caliber == 'Antiradar' || i.Weapon2Caliber == 'Antiradar' || i.Weapon3Caliber == 'Antiradar') {
      title = title + ' <:nato_sead:583815605124202507>';
    }

  } else if (i.Tab = 'NAV') {
    category = ('**해군** | **국가**: ' + i.MotherCountry + ' | ' + proto);
  }
  weapon1 = weapon1 + (' | **장전시간**: ' + i.Weapon1TimeBetweenShots + 's/Shot, ' + i.Weapon1TimeBetweenSalvos + 's/Salvo');
  weapon2 = weapon2 + (' | **장전시간**: ' + i.Weapon2TimeBetweenShots + 's/Shot, ' + i.Weapon2TimeBetweenSalvos + 's/Salvo');
  weapon3 = weapon3 + (' | **장전시간**: ' + i.Weapon3TimeBetweenShots + 's/Shot, ' + i.Weapon3TimeBetweenSalvos + 's/Salvo');
  weapon4 = weapon4 + (' | **장전시간**: ' + i.Weapon4TimeBetweenShots + 's/Shot, ' + i.Weapon4TimeBetweenSalvos + 's/Salvo');
  weapon5 = weapon5 + (' | **장전시간**: ' + i.Weapon5TimeBetweenShots + 's/Shot, ' + i.Weapon5TimeBetweenSalvos + 's/Salvo');
  weapon6 = weapon6 + (' | **장전시간**: ' + i.Weapon6TimeBetweenShots + 's/Shot, ' + i.Weapon6TimeBetweenSalvos + 's/Salvo');
  weapon7 = weapon7 + (' | **장전시간**: ' + i.Weapon7TimeBetweenShots + 's/Shot, ' + i.Weapon7TimeBetweenSalvos + 's/Salvo');
  weapon8 = weapon8 + (' | **장전시간**: ' + i.Weapon8TimeBetweenShots + 's/Shot, ' + i.Weapon8TimeBetweenSalvos + 's/Salvo');

  if (i.Weapon7Name == i.Weapon8Name) {
    i.weapon8Name = '';
  }
  if (i.Weapon5Name == i.Weapon6Name) {
    i.Weapon6Name = '';

  }
  if (i.Weapon3Name == i.Weapon4Name) {
    i.weapon4Name = '';
  }
  if (i.Weapon2Name == i.Weapon3Name) {
    i.weapon3Name = '';
  }

  if (i.Weapon1Name == i.Weapon2Name) {
    i.weapon2Name = '';
  }
  description = description + ' | **채력**: ' + i.Strength;

  weapon1 = weapon1 + (' | **안정장치**: ' + Math.trunc(i.Weapon1HitProbabilityWhileMoving * 100) + '%');
  weapon2 = weapon2 + (' | **안정장치**: ' + Math.trunc(i.Weapon2HitProbabilityWhileMoving * 100) + '%');
  weapon3 = weapon3 + (' | **안정장치**: ' + Math.trunc(i.Weapon3HitProbabilityWhileMoving * 100) + '%');

  if(i.Weapon1Type == 'Howitzer' || i.Weapon1Type == 'MLRS') {
    weapon1 = weapon1 + (' | **조준시간** : ' + i.Weapon1AimTime);
  }
  if(i.Weapon2Type == 'Howitzer' || i.Weapon2Type == 'MLRS') {
    weapon2 = weapon2 + (' | **조준시간** : ' + i.Weapon2AimTime);
  }

  if(i.Weapon1MissileMaxSpeed !== '') {
    weapon1 = weapon1 + (' | **미사일 속도**: ' + i.Weapon1MissileMaxSpeed);
  }
  if(i.Weapon2MissileMaxSpeed !== '') {
    weapon2 = weapon2 + (' | **미사일 속도**: ' + i.Weapon2MissileMaxSpeed);
  }
  if(i.Weapon3MissileMaxSpeed !== '') {
    weapon3 = weapon3 + (' | **미사일 속도**: ' + i.Weapon3MissileMaxSpeed);
  }

  category = category + (' \n **Spec decks**: ' + i.Decks);
  const embed = new Discord.RichEmbed()

    .setTitle(title)
    .setDescription(description)
    .setColor(color)

    .addField('**종류**', category)

    .addField('**이동수단**', movement)

    .addField('**가용량**', availability);

  //add fields for weapons only if the unit has the weapons
  if (i.Weapon1Name !== '') {
    embed.addField('**무장 1 ( ' + i.Weapon1Type + ')**', weapon1);
  }
  if (i.Weapon2Name !== '') {
    embed.addField('**무장 2 ( ' + i.Weapon2Type + ')**', weapon2);
  }
  if (i.Weapon3Name !== '') {
    embed.addField('**무장 3 ( ' + i.Weapon3Type + ')**', weapon3);
  }
  if (i.Weapon4Name !== '') {
    embed.addField('**무장 4 ( ' + i.Weapon4Type + ')**', weapon4);
  }
  if (i.Weapon5Name !== '') {
    embed.addField('**무장 5 ( ' + i.Weapon5Type + ')**', weapon5);
  }
  if (i.Weapon6Name !== '') {
    embed.addField('**무장 6 ( ' + i.Weapon6Type + ')**', weapon6);
  }
  if (i.Weapon7Name !== '') {
    embed.addField('**무장 7 ( ' + i.Weapon7Type + ')**', weapon7);
  }
  if (i.Weapon8Name !== '') {
    embed.addField('**무장 8 ( ' + i.Weapon8Type + ')**', weapon8);
  }


  if (i.Tab === 'INF') {
    if (i.Weapon2Type == 'SAM' && i.Training !== '') {
      embed.setThumbnail('https://imgur.com/Fsu5xhP.png');
    } else if (i.Weapon2Type == 'ATGM' && Number(i.Strength) < 10 && i.Training !== '') {
      embed.setThumbnail('https://imgur.com/CyGxIIc.png');
    } else if (i.Weapon2Type == 'AT' && i.Weapon3Name === '' && i.Training !== '') {
      embed.setThumbnail('https://imgur.com/Kafpr4d.png');
    } else if (i.Weapon2Type == 'Flamethrower') {
      embed.setThumbnail('https://imgur.com/y5h3LEE.png');
    } else if (i.Training == 'Shock' && Number(i.MaxSpeed) > 38) {
      embed.setThumbnail('https://imgur.com/etyRZVH.png');
    } else if (i.Training == 'Shock' && Number(i.MaxSpeed) < 38) {
      embed.setThumbnail('https://imgur.com/uIFXG9x.png');
    } else if (i.Training == 'Regular' && Number(i.MaxSpeed) < 31) {
      embed.setThumbnail('https://imgur.com/uIFXG9x.png');
    } else if (i.Training == 'Regular' && Number(i.MaxSpeed) > 31) {
      embed.setThumbnail('https://imgur.com/etyRZVH.png');
    }
  }
  if (i.Tab == 'LOG' && i.Training !== '') {
    embed.setThumbnail('https://imgur.com/jdkNJNj.png');
  }

  if (i.Training == 'Elite') {
    embed.setThumbnail('https://imgur.com/upNpaW8.png');
  } else if (i.Training !== 'Elite' && i.Training !== '' && i.Tab == 'REC') {
    embed.setThumbnail('https://imgur.com/xB5ISIK.png');
  }

  return embed;
};
