<form action="/write" method="POST">
        <input type="text" name="title" placeholder="Title" class="form-control" required>
        <input type="text" name="description" placeholder="Give a short description of your story" class="mt-3 form-control" required>
        <textarea name="content" cols="30" rows="10" class="mt-3 form-control" placeholder="Share your story..."
            required></textarea>
        <input type="submit" name= "submit" value="Save" class="mt-5 btn btn-md btn-warning">
         <a href= "/register" class="mt-5 btn btn-md btn-danger"> Get Started </a>
    </form>