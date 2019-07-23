const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
function findEmployeeByName(names, arr){
  return arr.filter((el)=>{
    if(el.name === names){
      return el;
    }
  })[0];
}
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager
function findManagerFor(cb, arr1){
  cb = function findEmployeeByName(names, arr){
    arr = arr1;
    let result = [];
 for(let i=0; i<arr.length; i++){
   if(arr[i].managerId){
     result.push(arr[i]);
   }
 }
 return result[0];
    };
  return cb();
}
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
function findCoworkersFor(cb, outerArr){
  cb = function findEmployeeByName(names, innerArr){
    innerArr = outerArr;
    let result = [];
    let arr = [];
    let namedArr = [];
    for (let i=0; i<innerArr.length; i++){
      if(innerArr[i].name === names){
        namedArr.push(innerArr[i]);
      }else if (innerArr[i].name !== names){
        arr.push(innerArr[i]);
      }
    }
    for(let j=0; j<arr.length; j++){
      if(arr[j].managerId === namedArr[0].managerId){
        result.push(arr[j]);
      }
    }
    return result;
    };
  return cb();
}

console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));
/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
function findManagementChainForEmployee(cb, outerArr){
  cb = function findEmployeeByName(names, innerArr){
    innerArr = outerArr;
    let result = [];
    let arr = [];
    let namedArr = [];
    for (let i=0; i<innerArr.length; i++){
      if(innerArr[i].name === names){
        namedArr.push(innerArr[i]);
      }else if (innerArr[i].name !== names){
        arr.push(innerArr[i]);
      }
    }
    for(let j=0; j<arr.length; j++){
      if(arr[j].managerId < namedArr[0].managerId){
        result.push(arr[j]);
      }
    }
    return result;
    };
  return cb();
}

console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');
spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));
/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
function generateManagementTree(arr){
  arr = {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  return arr;
}
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
function displayManagementTree(cb){
  cb = function generateManagementTree(obj){
    let result = '';
  for(let key1 in obj){
    if(Array.isArray(obj[key1])){
      for(let key2 in obj[key1]){
        if(Array.isArray(obj[key1][key2])){
          for(let key3 in obj[key1][key2]){
            if(Array.isArray(obj[key1][key2][key3])){
              for(let key4 in obj[key1][key2][key3]){
                result += '---'+obj[key1][key2][key3].name;
              }
            }else {
              result += '--'+obj[key1][key2].name;
            }
          }
        }else{
          result += '-'+obj[key1].name;
        }
      }
    }else{
      result += obj.name;
    }
  }
  return result;
  }
  return cb();
}
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
