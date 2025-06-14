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

	// Display the task to do
	if(!task.todo && task.completed.length === 0){
		ul.innerHTML += 'Nothing pending.'
	} else{
		if(task.todo.length === 0){
			ul.innerHTML = 'Nothing pending.'
		}
		let html = '';
		pending.innerText = 'Pending'
		task.todo.forEach((todo) => {
			html += `
			<div class='li'>
				<div class='inner_li'>
					<li class='delete_task details'>${todo.task}</li>
					<span class="check"> &checkmark; </span>
				</div>
				<span>Added: ${todo.date}</span>
				
			</div>
			`;
		})
		ul.innerHTML += html;

		
		completed.innerText = 'Completed'
		if(task.completed == 0){
			ul_completed.innerHTML += `Nothing completed yet...`
		} else{
			// console.log(task)
			task.completed.forEach((x) => {
				ul_completed.innerHTML += `
					<div class='li'>
						<div class='inner_li'>
							<li class='delete'>${x.task}</li>
						</div>
						<span>Completed: ${x.completed}</span>
					</div>
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

		// mark as complete - IT WORKS
		let complete = document.querySelectorAll('.check');
		complete.forEach((x, i) => {
            x.addEventListener('click', () => {
				console.log(x)
				const today = new Date();
                const taskText = x.previousElementSibling.innerText;
				const complete = {
					task:taskText,
					completed: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
				}
				x.classList.add('done')
				task.completed.push(complete)
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
			const today = new Date();
			const newTask = {
				task: input.value,
				subtask: [],
				completed:[],
				date: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
			}
            
			task.todo.unshift(newTask)
			localStorage.setItem('MyList', JSON.stringify(task))
			location.reload()
			console.log(newTask)
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
			
			i.addEventListener('click', (e) => {
				const index = task.completed.findIndex(item => item.task === i.innerText);
				if (index > -1) {
					task.completed.splice(index, 1);
				}

				localStorage.setItem('MyList', JSON.stringify(task))
				location.reload(); 


			})
		})