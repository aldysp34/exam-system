<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\Test;
use App\Models\ObjectDetection;
use App\Models\User;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [
            'title' => 'Results by Tests',
            'tests' => Test::all()
        ];

        return view('cbt.admin.manage.results.by_tests.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Test $test)
    {
        $test->load('results.user');
        $usersWithResults = [];

        foreach($test->results as $result){
            $user = $result->user;

            if(!isset($usersWithResults[$user->id])){
                $usersWithResults[$user->id] = [
                    'user' => $user,
                    'results' => [],
                ];
            }

            $usersWithResults[$user->id]['results'][] = $result;
        }

        $data = [
            'title' => $test->name.'\'s Results',
            'test' => $test,
            'usersWithResults' => $usersWithResults,
        ];

        return view('cbt.admin.manage.results.by_tests.show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function get_proctor($test_id, $user_id){
        $objects = ObjectDetection::where('test_id', $test_id)
                                ->where('user_id', $user_id)
                                ->get();
        // $userObjects = [];
        // foreach($objects as $object){
        //     $objectArray = [];
        //     $proctorDataArray = [];
        //     $objectArray['filepath'] = $object['filepath'];
        //     $parsedProctor = json_decode($object['proctor_data'], true);
        //     $objectArray['proctor_data'] = $parsedProctor;
        //     $objectArray['created_at'] = Carbon::createFromFormat('Y-m-d H:i:s', $object['created_at']);

        //     array_push($userObjects, $objectArray);
        // }
        $user = User::findOrFail($user_id);
        if(count($objects) > 0){
            $data = [
                'title' => $user->name.'\'s Proctor Data',
                'objects' => $objects
            ];
        }else{
            $data = [
                'title' => $user->name.'\'s Proctor Data',
                'status' => "Not Found"
            ];
        }

        return view('cbt.admin.manage.results.by_tests.proctor', $data);
    }
}
