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

const findEmployeeByName = (name, employees) => employees.find( employee => employee.name === name);

console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

const findManagerFor = (employee, employees) => employees.find( _employee => _employee.id === employee.managerId);

console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
const findCoworkersFor = (employee, employees) => employees.filter( _employee => _employee.managerId === employee.managerId && employee.id !== _employee.id);

console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));
/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

const findManagementChainForEmployee = (employee, employees) => {
  const chain = [];
  let current = findManagerFor(employee, employees);
  while(current){
    chain.push(current);
    current = findManagerFor(current, employees);
  }
  return chain.reverse();

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
const generateManagementTree = (employees) => {
  const manager = employees.find( employee => !employee.managerId);
  return { ...manager, reports: generateDirectReports(manager, employees) }
};
const generateDirectReports = (manager, employees)=>{
  return employees.filter( employee => employee.managerId === manager.id).reduce((acc, employee)=> {
    acc.push({...employee, reports: generateDirectReports(employee, employees)});
    return acc;
  }, []);
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
const displayManagementTree = (boss, level = 0)=> {
  const arr = new Array(level);
  console.log(`${arr.fill('-').join('')}${boss.name}`)
  level = level + 1;
  boss.reports.forEach((boss)=> {
    displayManagementTree(boss, level)
  })
};
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
