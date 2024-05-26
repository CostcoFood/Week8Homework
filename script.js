class Dish {
    constructor(name, type) {
    this.name = name;
    this.type = type;
    }
    // explains dishes name and type of dish
    describe() {
    return `${this.name} is a ${this.type} dish`;
    }
    }
    class Course {
    constructor(name) {
    this.name = name;
    this.dishes = [];
    }
    //adds dish to dishes array
    addDish(dish) {
    if (dish instanceof Dish) {
    this.dishes.push(dish);
    } else {
    throw new Error(`You can only add an instance of Dish. 
    argument is not a dish: ${dish}`);
    }
    }
    //describes ammount of dishes to the courses
    describe() {
    return `${this.name} has ${this.dishes.length} dishes.`;
    }
    }
    
    class Menu {
        constructor() {
            this.courses = [];
            this.selectedCourse = null;
        }
        start() {
            let selection = this.showMainMenuOptions();
            while (selection != 0) {
                switch(selection){
                    case '1' :
                        this.createCourse();
                        break;
                    case '2' :
                        this.viewCourse();
                        break;
                    case '3':
                        this.deleteCourse();
                        break;
                    case '4' :
                        this.displayCourses();
                        break;
                    default:
                        selection = 0;
                }
                selection = this.showMainMenuOptions();
            }
            alert('Goodbye!');
        }
        showMainMenuOptions() {
            return prompt(`
                0) back
                1) create a new course
                2) view a course
                3) delete a course
                4) display all courses
            `);
        }
        showCourseMenuOptions(courseInfo){
            return prompt(`
                0) back
                1) add a new dish
                2) delete a dish
                ---------------
                ${courseInfo}
                `);
        }
        displayCourses() {
            let courseString = '';
            for (let i = 0; i < this.courses.length; i++) {
                courseString += i+ ') ' + this.courses[i].name + '\n';
            }
            alert(courseString);
        }
        createCourse() {
            let name = prompt('Enter name for new course: ');
            this.courses.push(new Course(name));
        }
        viewCourse() {
            let index = prompt('Enter the index of the course that you want to view: ');
            if (index > -1 && index < this.courses.length) {
                this.selectedCourse = this.courses[index];
                let description = 'Course name: ' + this.selectedCourse.name + '\n';
                description += ' ' + this.selectedCourse.describe() + '\n ';
                for (let i = 0; i < this.selectedCourse.dishes.length; i++) {
                    description += i + ') ' + this.selectedCourse.dishes[i].describe() + '\n';
                }
                let selecton1 = this.showCourseMenuOptions(description);
                switch (selecton1) {
                    case '1':
                        this.createDish();
                        break;
                    case '2':
                        this.deleteDish();
                }
            }
        }
        deleteCourse() {
            let index = prompt('Enter the index of the course you would like to delete: ');
            if (index > -1 && index < this.courses.length) {
                this.courses.splice(index, 1);
            }
        }
        createDish() {
             let name = prompt('Enter the name of the new dish: ');
             let type = prompt('Enter type of new dish: ');
             this.selectedCourse.addDish(new Dish(name, type));
        }
        deleteDish() {
            let index = prompt('Enter the index of the dish you would like to delete: ');
            if (index > -1 && index < this.selectedCourse.dishes.length) {
                this.selectedCourse.dishes.splice(index, 1);
            }
        }
    }
    let menu = new Menu();
    menu.start();