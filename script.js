let all = document.getElementById('to_do')
let ul_completed = document.getElementById('completed_list')
let ul = document.getElementById('ul')
let add = document.getElementById('add');
let input = document.getElementById('input');
let delete_all = document.getElementById('delete_all')
const completed = document.getElementById('completed')
const pending = document.getElementById('pending')
		
let MyList = {
	todo: [],
	completed: []
    
}

let task = JSON.parse(localStorage.getItem('MyList')) || {...MyList}

	// Display the task to to
	if(!task.todo && task.completed.length === 0){
		ul.innerHTML += 'Nothing pending.'
	} else{
		if(task.todo.length === 0){
			ul.innerHTML = 'Nothing pending.'
		}
		pending.innerText = 'Pending'
		task.todo.forEach((todo) => {
			ul.innerHTML += `
			<div class='li'>
				<li class='delete_task details'>${todo.task}</li>
				<span class="check"> &checkmark; </span>
			</div>
			`;
		})
		completed.innerText = 'Completed'
		if(task.completed == 0){
			ul_completed.innerHTML += `Nothing completed yet...`
		} else{
			task.completed.forEach((done) => {
				ul_completed.innerHTML += `
				<li class='delete'>${done}</li>
				`
			})
		}
	}

        //Navigate / details page - IT WORKS
        let details = document.querySelectorAll('.details');
        details.forEach((x, i) => {
            x.addEventListener('click', () => {
                window.location.href = `theTask.html?id=${i}`
            })
        })

		// mark as done - IT WORKS
		let complete = document.querySelectorAll('.check');
		complete.forEach((x, i) => {
            x.addEventListener('click', () => {
                console.log(i)
                const taskText = x.previousElementSibling.innerText;
                // window.location.href = `theTask.html?id=${x}`
				x.classList.add('done')
				task.completed.push(taskText)
				if (i > -1) {
					task.todo.splice(i, 1);
				}

				localStorage.setItem('MyList', JSON.stringify(task))
				location.reload(); 

			})
		})

		// add task - IT WORKS
		add.addEventListener('click', (e) => {
			e.preventDefault()
			const newTask = {
				task: input.value,
				subtask: [],
				completed:[]
			}
            
			task.todo.push(newTask)
			localStorage.setItem('MyList', JSON.stringify(task))
			location.reload()
		})

		// clear all - IT WORKS
		delete_all.addEventListener('click', () => {
			localStorage.removeItem('MyList')
			alert('everything was removed')
			console.log('add deleted')
			location.reload()	
		})

		// REMOVE ONE TASK - IT WORKS
		let delete_item = document.querySelectorAll('.delete')
		delete_item.forEach((i) => {
			i.addEventListener('click', () => {
				// alert(i.innerText)
				// i.classList.add('done')
				// task.completed.push(i.innerText)
				const index = task.completed.indexOf(i.innerText);
				if (index > -1) {
					task.completed.splice(index, 1);
				}

				localStorage.setItem('MyList', JSON.stringify(task))
				location.reload(); 


			})
		})
