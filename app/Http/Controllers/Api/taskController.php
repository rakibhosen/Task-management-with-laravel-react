<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\repositories\TaskRepository;
use Illuminate\Support\Facades\Validator;

class taskController extends Controller
{
    public $taskRepository;

    public function __construct(TaskRepository $taskRepository){
        $this->taskRepository = $taskRepository;
    }

    
    public function index(){
        $tasks =$this->taskRepository->getAll();
        return response()->json([
            'message'=>'task List',
            'success'=>'true',
            'data'=>$tasks
        ]);
    }

    public function show($id){
        $task =$this->taskRepository->findById($id);

        if(is_null($task)){
            return response()->json([
                'message'=>'Data not found',
                'success'=>'false',
                'data'=>null
            ]);
        }else{
            return response()->json([
                'message'=>'task List',
                'success'=>'true',
                'data'=>$task
            ]);
        }

    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = validator::make($formData,[
            'name'=>'required',
            'description'=>'required',
            'project_id'=>'required'
        ],[
            'name.required'=>'Please give task name',
            'description'=>'please give task description',
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->getMessageBag()->first(),
                'errors'=>$validator->getMessageBag(),
                
                
            ]);
            
        }
        $task = $this->taskRepository->create($request);
            return response()->json([
                'success'=>true,
                'message'=>'Data stored',
                'data'=>$task,
            ]);
    }


    public function update(Request $request,$id)
    {
        $task = $this->taskRepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success'=>false,
                'message'=>'Data not found'   
            ]);
        }

        $formData = $request->all();
        $validator = validator::make($formData,[
            'name'=>'required',
            'description'=>'required',
            'project_id'=>'required'
        ],[
            'name.required'=>'Please give task name',
            'description'=>'please give task description',
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->getMessageBag()->first(),
                'errors'=>$validator->getMessageBag(),
                
                
            ]);
            
        }
        $task = $this->taskRepository->edit($request,$id);
            return response()->json([
                'success'=>true,
                'message'=>'Data updated',
                'data'=>$task,
            ]);
    }

    public function destroy($id)
    {
        $task = $this->taskRepository->findById($id);
        if(is_null($task)){
            return response()->json([
                'success'=>false,
                'message'=>'Data not found'   
            ]);
        }

        $task = $this->taskRepository->delete($id);
        return response()->json([
            'success'=>true,
            'message'=>'Data deleted successfully'   
        ]);

    }

}
