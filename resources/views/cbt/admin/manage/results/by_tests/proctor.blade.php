@extends('layouts.admin.app')

@section('body')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>{{ $title }}</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">Manage</li>
                    <li class="breadcrumb-item active"><a
                            href="{{ route('admin.manage.tests') }}">Tests</a></li>
                </ol>
            </div>
        </div>
    </div><!-- /.container-fluid -->
</section>

<!-- Main content -->
<section class="content">
    <div class="container-fluid">
        <div id="alert">
            @if($errors->any())
                <div class="alert alert-danger" role="alert">
                    @foreach($errors->all() as $error)
                        {{ $error }} <br>
                    @endforeach
                </div>
            @endif
            @if(session('message'))
                <div class="alert alert-success" role="alert">
                    {{ session('message') }}
                </div>
            @endif
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div class="d-none" id="btn-create">
                            
                        </div>
                        <table id="example2" class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Pergerakan Mata</th>
                                    <th>Handphone</th>
                                    <th>Status</th>
                                    <th>Pergerakan 1</th>
                                    <th>Pergerakan 2</th>
                                    <th>Waktu</th>
                                </tr>
                            </thead>
                            <tbody>
                                @if(!isset($status))
                                    @foreach($objects as $object)
                                        <tr>


                                            <th scope="row" width="1">{{ $loop->index + 1 }}</th>
                                            <td><img src="{{$object['filepath']}}" alt="img"></td>

                                            @php
                                                $proctorData = json_decode($object['proctor_data'], true);
                                            @endphp

                                            <td>{{ $proctorData['eye_movements'] }}</td>
                                            <td>{{ $proctorData['mob_status'] }}</td>
                                            <td>{{ $proctorData['person_status'] }}</td>
                                            <td>{{ $proctorData['user_move1'] }}</td>
                                            <td>{{ $proctorData['user_move2'] }}</td>
                                            <td>{{ $object['created_at'] }}</td>
                                        </tr>
                                    @endforeach
                                @else
                                    <td>No DATA!</td>
                                @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
