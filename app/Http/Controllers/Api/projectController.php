<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\repositories\ProjectRepository;
use Illuminate\Support\Facades\Validator;

class projectController extends Controller
{
    public $projectRepository;

    public function __construct(ProjectRepository $projectRepository){
        $this->projectRepository = $projectRepository;
    }

    
    public function index(){
        $projects =$this->projectRepository->getAll();
        return response()->json([
            'message'=>'Project List',
            'success'=>'true',
            'data'=>$projects
        ]);
    }

    public function show($id){
        $project =$this->projectRepository->findById($id);

        if(is_null($project)){
            return response()->json([
                'message'=>'Data not found',
                'success'=>'false',
                'data'=>null
            ]);
        }else{
            return response()->json([
                'message'=>'Project List',
                'success'=>'true',
                'data'=>$project
            ]);
        }

    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = validator::make($formData,[
            'name'=>'required',
            'description'=>'required',
            'user_id'=>'required'
        ],[
            'name.required'=>'Please give project name',
            'description'=>'please give project description',
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->getMessageBag()->first(),
                'errors'=>$validator->getMessageBag(),
                
                
            ]);
            
        }
        $project = $this->projectRepository->create($request);
            return response()->json([
                'success'=>true,
                'message'=>'Data stored',
                'data'=>$project,
            ]);
    }


    public function update(Request $request,$id)
    {
        $project = $this->projectRepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success'=>false,
                'message'=>'Data not found'   
            ]);
        }

        $formData = $request->all();
        $validator = validator::make($formData,[
            'name'=>'required',
            'description'=>'required',
            'user_id'=>'required'
        ],[
            'name.required'=>'Please give project name',
            'description'=>'please give project description',
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->getMessageBag()->first(),
                'errors'=>$validator->getMessageBag(),
                
                
            ]);
            
        }
        $project = $this->projectRepository->edit($request,$id);
            return response()->json([
                'success'=>true,
                'message'=>'Data updated',
                'data'=>$project,
            ]);
    }

    public function destroy($id)
    {
        $project = $this->projectRepository->findById($id);
        if(is_null($project)){
            return response()->json([
                'success'=>false,
                'message'=>'Data not found'   
            ]);
        }

        $project = $this->projectRepository->delete($id);
        return response()->json([
            'success'=>true,
            'message'=>'Data deleted successfully'   
        ]);

    }

}
