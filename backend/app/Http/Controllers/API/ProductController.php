<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::query();

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $perPage = $request->query('per_page', 10);
        $products = $query->orderBy('created_at', 'desc')->paginate($perPage)->appends($request->query());

        return response()->json([
            'success' => true,
            'message' => 'Products retrieved successfully.',
            'data' => ProductResource::collection($products),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ]
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'error' => $validator->errors()
            ], 422);
        }

        $slug = Str::slug($input['name']);
        if (Product::where('slug', $slug)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Product name already exists.'
            ], 422);
        }
        $input['slug'] = $slug;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public');
            $input['image'] = asset('storage/' . $path);
        }

        $product = Product::create($input);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully.',
            'data' => new ProductResource($product)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): JsonResponse
    {
        try {
            $product = Product::find($id);

            return response()->json([
                'success' => true,
                'message' => 'Product retrieved successfully.',
                'data' => new ProductResource($product)
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found.'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product): JsonResponse
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'image_url' => 'nullable|url',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'error' => $validator->errors()
            ], 422);
        }

        $slug = Str::slug($input['name']);
        if ($product->slug !== $slug && Product::where('slug', $slug)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Product name already exists.'
            ], 422);
        }

        if ($request->hasFile('image')) {
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }

            $imagePath = $request->file('image')->store('products', 'public');
            $product->image = Storage::url($imagePath);
        } elseif (!$request->filled('image_url')) {
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }

            $product->image = null;
        } elseif ($request->filled('image_url')) {
            $product->image = $input['image_url'];
        }

        $product->name = $input['name'];
        $product->description = $input['description'];
        $product->price = $input['price'];
        $product->slug = $slug;
        $product->save();

        return response()->json([
            'success' => true,
            'message' => 'Product updated successfully.',
            'data' => new ProductResource($product)
        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully.'
        ]);
    }
}
