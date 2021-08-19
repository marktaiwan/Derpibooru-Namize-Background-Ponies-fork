// ==UserScript==
// @name        Ponerpics Namize Background Ponies!
// @namespace   https://github.com/marktaiwan/
// @description Namize Background Ponies on Ponerpics!
// @icon        http://orig13.deviantart.net/d1b5/f/2017/079/6/7/derpy_by_theshadowartist100_by_vcsajen-db2xkv3.png
// @match       https://*.ponerpics.org/*
// @version     1.045
// @inject-into content
// @noframes
// @require     https://raw.githubusercontent.com/soufianesakhi/node-creation-observer-js/master/release/node-creation-observer-latest.js
// ==/UserScript==

(function () {

/* Script settings--------------------------------------------------------------------------------- */

  // change this to false if you don't like colors
  const colored = true;

  // true -  full name will be coloured
  // false - only marker will be coloured
  const fullNameColor = false;

  // change this to false if you don't wish add " (Background Pony)" to the end of anon's "names"
  const addBackgroundPony = true;

/* ------------------------------------------------------------------------------------------------ */

  const SCRIPT_ID = 'namize_bp';
  const names1 = ['', '8-bit', 'Aero', 'Air', 'Almond', 'Alpha', 'Amaranthine', 'Amber', 'American', 'Annoying', 'Apple', 'Apricot', 'Aqua', 'Asian', 'Astral', 'Awesome', 'Bad', 'Beauty', 'Beige', 'Bell', 'Belle', 'Berry', 'Big', 'Bitter', 'Black', 'Blaze', 'Blazing', 'Blue', 'Bold', 'Bon', 'Bright', 'Brisk', 'Broken', 'Bronze', 'Brown', 'Candy', 'Caramel', 'Careless', 'Carrot', 'Charming', 'Cherry', 'Chilly', 'Chimmy', 'Choco', 'Chocolate', 'Chromatic', 'Chubby', 'Citric', 'Classic', 'Clean', 'Clear', 'Clever', 'Cloudy', 'Cocky', 'Coco', 'Cold', 'Cool', 'Copper', 'Corky', 'Correct', 'Cosmic', 'Cranky', 'Crazy', 'Curly', 'Cute', 'Cutie', 'Da’', 'Daring', 'Dark', 'Deadly', 'Delta', 'Derpy', 'Desert', 'Desired', 'Diamond', 'Dim', 'Dirty', 'Ditzy', 'Dizzy', 'DJ', 'Doctor', 'Double', 'Drama', 'Dusk', 'Eastern', 'Easy', 'Emerald', 'Empress', 'Epic', 'European', 'Fancy', 'Fantastic', 'Fast', 'Fat', 'Fifth', 'Filthy', 'First', 'Flash', 'Flirtatious', 'Fluffy', 'Flutter', 'Foggy', 'Fourth', 'Full', 'Funny', 'Fuzzy', 'Gamma', 'General', 'Gentle', 'Ginger', 'Glass', 'Glitter', 'Golden', 'Good', 'Gotta', 'Gray', 'Green', 'Half', 'Half Baked', 'Handsome', 'Happy', 'Hard', 'Hasty', 'Heavy', 'Hematite', 'High', 'Holly', 'Honey', 'Horny', 'Hot', 'Hyper', 'Ice', 'Igneous', 'Innocent', 'Iron', 'Ivory', 'Jasper', 'Large', 'Last', 'Lavender', 'Legendary', 'Lemon', 'Lemony', 'Liberty', 'Light', 'Lightning', 'Lilac', 'Little', 'Lone', 'Long', 'Lovely', 'Low', 'Lucky', 'Main', 'Malachite', 'Melo', 'Metal', 'Meteor', 'Mini', 'Misty', 'Mixed', 'Mud', 'Multicolored', 'My Little', 'Mysterious', 'Mythical', 'Navy', 'Neat', 'Neon', 'Night', 'Noisy', 'Northern', 'Nurse', 'Nyan', 'Old', 'Olive', 'Omega', 'Onyx', 'Orange', 'Over', 'Paper', 'Party', 'Peachy', 'Pear', 'Pearl', 'Perfect', 'Pink', 'Pinkie', 'Platinum', 'Plumy', 'Princess', 'Professor', 'Proud', 'Pure', 'Purple', 'Quartz', 'Queen', 'Quick', 'Rainbow', 'Rainy', 'Red', 'Rosy', 'Ruby', 'Ruff', 'Sad', 'Sapphire', 'Saucy', 'Sea', 'Second', 'Shadow', 'Sharp', 'Shining', 'Short', 'Shy', 'Silken', 'Silver', 'Simply', 'Slow', 'Smart', 'Smooth', 'Snappy', 'Sneaky', 'Soft', 'Sonic', 'Southern', 'Speedy', 'Spicy', 'Starry', 'Stella', 'Stellar', 'Stellate', 'Stinkin\'', 'Stolid', 'Strict', 'Strong', 'Sugar', 'Sunny', 'Super', 'Sweet', 'Tasty', 'The Great and Powerful', 'Third', 'Thunder', 'Timid', 'True', 'Turquoise', 'Twilight', 'Under', 'Vanilla', 'Violet', 'Warning', 'Western', 'White', 'Windy', 'Winy', 'Yellow'];
  const names2 = ['Angel', 'Apple', 'Apples', 'Armor', 'Armour', 'Assassin', 'Autumn', 'Barry', 'Beauty', 'Bee', 'Beetle', 'Bell', 'Belle', 'Berries', 'Blade', 'Blink', 'Blossom', 'Bomb', 'Bon', 'Bone', 'Bones', 'Book', 'Boom', 'Boomer', 'Bread', 'Brooch', 'Brook', 'Bubble', 'Bubbles', 'Bug', 'Bun', 'Bunny', 'Butterfly', 'Button', 'Cake', 'Candle', 'Candy', 'Cargo', 'Cat', 'Changa', 'Charge', 'Cherry', 'Cider', 'Class', 'Clearing', 'Cloud', 'Cola', 'Comet', 'Computer', 'Cook', 'Crasher', 'Crate', 'Cream', 'Creeper', 'Crown', 'Crush', 'Crusher', 'Cupcake', 'Cupcakes', 'Curse', 'Daiquiri', 'Dance', 'Dancer', 'Dash', 'Dasher', 'Dashy', 'Day', 'Days', 'Deal', 'Derp', 'Dessert', 'Devil', 'Dew', 'Diamond', 'Dog', 'Dovahkiin', 'Dream', 'Dress', 'Drop', 'Dubstep', 'Dust', 'Dusty', 'Earring', 'Eclair', 'Egg', 'Emerald', 'Envy', 'Eye', 'Eyes', 'Factory', 'Faith', 'Fall', 'Fear', 'Feather', 'Feathers', 'Fire', 'Flag', 'Flame', 'Flames', 'Flare', 'Floor', 'Flower', 'Flowers', 'Flyer', 'Folder', 'Forest', 'Fork', 'Frost', 'Glass', 'Ground', 'Halo', 'Harvest', 'Hawk', 'Hay', 'Haze', 'Head', 'Heart', 'Hills', 'Hoof', 'Hooves', 'Hope', 'Horn', 'Horns', 'Horseshoe', 'Horseshoes', 'Hunt', 'Hunter', 'Image', 'In Socks', 'Jam', 'Jazz', 'Journal', 'Kettle', 'Key', 'Kill', 'Kills', 'Knife', 'Knight', 'Ladle', 'Lady', 'Lake', 'Lamp', 'Leaf', 'Lemon', 'Lemonade', 'Light', 'List', 'Loaf', 'Love', 'Luna', 'Mane', 'Mess', 'Miner', 'Mint', 'Mints', 'Mist', 'Moon', 'Mouse', 'Muffin', 'Music', 'Necklace', 'Needle', 'News', 'Night', 'Nights', 'Noon', 'Note', 'Notes', 'Nova', 'Patty', 'Pepper', 'Picnic', 'Picture', 'Pie', 'Pirate', 'Pixel', 'Pony', 'Pop', 'Popper', 'Pride', 'Prism', 'Prod', 'Punk', 'Rainbow', 'Rat', 'Reaper', 'Rice', 'Ring', 'Rock', 'Roll', 'Romance', 'Rosette', 'Ruby', 'Runner', 'Saddle', 'Sapphire', 'Scapula', 'Shield', 'Shimmer', 'Shine', 'Shovel', 'Shower', 'Shy', 'Signal', 'Skies', 'Sky', 'Slapjack', 'Snap', 'Snow', 'Song', 'Soul', 'Sparkle', 'Sparky', 'Spawn', 'Sphere', 'Spider', 'Spin', 'Spirit', 'Spoon', 'Spring', 'Stairs', 'Star', 'Stars', 'Stool', 'Strike', 'String', 'Strings', 'Stripe', 'Stripes', 'Stuff', 'Summer', 'Sun', 'Swirl', 'Sword', 'Swords', 'Table', 'Tart', 'Tiara', 'Time', 'Times', 'Top', 'Tree', 'Trees', 'Trixie', 'Tron', 'Twist', 'Vise', 'Water', 'Waterfall', 'Wheat', 'Wind', 'Window', 'Wing', 'Wings', 'Winter', 'Wolf'];


  const searchRegexp = new RegExp('\\bBackground Pony #([0-9A-F]{2})([0-9A-F]{2})\\b');
  const styleCache = new Map();

  function getBPName(re, match) {
    const index1 = parseInt(match[1],16);
    const index2 = parseInt(match[2],16);

    const title = match[1] + match[2];
    const className = (colored) ? getClassName(match[1] + match[2]) : '';
    const ponyName = ((index1 != 0) ? names1[index1] + ' ' : '') + names2[index2];

    const spanBefore = (fullNameColor) ? '' : ponyName + ' ';
    const spanInner = (fullNameColor) ? ponyName : '•';
    const spanAfter = (addBackgroundPony) ? ' (Background Pony)' : '';

    const replacementString = `${spanBefore}<span title="${title}" class="${className}">${spanInner}</span>${spanAfter}`;

    re = re.replace(searchRegexp, replacementString);
    return re;
  }

  function processVanillaJSNode(node) {
    const nodeList = node.childNodes;

    for (let i = 0; i < nodeList.length; i++) {
      const childNode = nodeList[i];

      // text node found, do the replacement
      if (childNode.nodeType == 3) {
        const origString = childNode.data;
        const match = origString.match(searchRegexp);

        if (match) {
          childNode.data = getBPName(safe_tags_replace(origString), match);
          const skip = wrapTextNode(childNode);
          i += skip;
        }
      }
    }
  }

  function getClassName(id) {
    const className = `namize-bp--${id}`;

    if (!styleCache.has(className)) {
      const cssString = getColorStyle(id);
      styleCache.set(className, cssString);
      addStyle(`.${className} {${cssString}}`);
    }

    return className;
  }

  function getColorStyle(color16bit) {
    const pixel = parseInt(color16bit, 16);

    const red_mask = 0xF800;
    const green_mask = 0x7E0;
    const blue_mask = 0x1F;

    const red_value = (pixel & red_mask) >> 11;
    const green_value = (pixel & green_mask) >> 5;
    const blue_value = (pixel & blue_mask);

    // Expand to 8-bit values.
    let red = red_value << 3;
    let green = green_value << 2;
    let blue = blue_value << 3;

    [red, green, blue] = [red, green, blue].map(val => val.toString().padStart(3));

    return `color: rgb(${red}, ${green}, ${blue});`;
  }

  function insertAfter(newEle, ele) {
    ele.parentNode.insertBefore(newEle, ele.nextSibling);
  }

  function wrapTextNode(textNode) {
    const div = document.createElement('div');
    div.innerHTML = textNode.textContent;

    const nodeCount = div.childNodes.length;
    let lastNode = textNode;
    let childNode = div.firstChild;

    while (childNode) {
      insertAfter(childNode, lastNode);
      lastNode = childNode;
      childNode = div.firstChild;
    }

    textNode.parentNode.removeChild(textNode);
    return nodeCount;
  }

  function replaceTag(tag) {
    const tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    };
    return tagsToReplace[tag] || tag;
  }

  function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
  }

  function addStyle(css) {
    const styleElement = document.getElementById(`${SCRIPT_ID}-style`);
    styleElement.innerHTML += css + '\n';
  }

  const styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.id = `${SCRIPT_ID}-style`;
  document.body.insertAdjacentElement('afterend', styleElement);

  const textNodes = document.evaluate( ".//a | .//strong | .//div[@class='metasection'] | .//div[contains(concat(' ', normalize-space(@class), ' '), ' post-author ')] | .//div[contains(concat(' ', normalize-space(@class), ' '), ' communication__body ')] | .//div[@class='small'] | .//div[@class='small-text'] | .//span[@class='block__header__title'] | .//td[@class='topic-lastpost'] | .//td[@class='table--communication-list__last-post'] | .//div[@id='duplicate_reporting']//td[@class='center image-cell'] | .//div[@class='block__content flex communication__options']/div[@class='flex__right'] | .//span[@class='spacing-right'] | .//main[@id='content']/h1 | .//div[@class='block__content alternating-color'] | .//div[@class='block__content flex alternating-color']/div[@class='flex__grow'] | .//td[@class='blank']",
    document.body,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

  for (let i = 0; i < textNodes.snapshotLength; i++) {
    const node = textNodes.snapshotItem(i);
    processVanillaJSNode(node);
  }

  NodeCreationObserver.onCreation('div.comment_info > strong, div.comment_body a, div.post-prevue a, span.post-author, div.post-author, .communication__body__sender-name > strong, div.post-text a, div.communication__body__text a, .block__header__item, .communication a', processVanillaJSNode);
})();
