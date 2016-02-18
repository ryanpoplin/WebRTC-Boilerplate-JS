"use strict"

// expose the browser-specific versions of the getUserMedia() method through the standard 
// method name. if the standard name is already supported in the browser,
// use that, otherwise fall back to Mozilla's, Google's, or Microsoft's implementation as 
// appropriate for the current browser
// WebRTC only works when files are served via HTTP/S, so just use Node.js to serve it (http-server via terminal on the directory)
// polyfill
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia

// access the webcam and microphone

// define a function to execute if we are able to access the user's webcam and microphone
// take the stream of data provided and pass it as the "src" attr. of a video element on the current html document and relay back the output from their webcam and microphone
function onSuccess (stream) {
	console.log("Successful connection made to access webcam and microphone")
	// create a new video element 
	var video = document.createElement("video"),
	// get browser to create a unique URL to reference the binary data directly from the provided stream, as it is not a file with a fixed URL 
	videoSource = window.URL.createObjectURL(stream)
	// ensure the <video> element starts playing the video immediately 
	video.autoplay = true 
	// point the "src" attr. of the <video> element to the generated stream URL, to relay the data from the webcam and microphone back to the user 
	video.src = videoSource 
	// add the <video> element to the end of the current page
	document.body.appendChild(video)
}

// define a function to execute if we are unable to access the user's webcam and microphone - either because the user denied access or because of a technical error 
function onError () {
	throw new Error("There has been a problem accessing the webcam and microphone")
}

// using the polyfill, we know the getUserMedia() method is supported in the browser if the method exists 
if (navigator.getUserMedia) {
	// We can now execute the getUserMedia() method, passing in an object telling the brower which form of media we wish to access ("video" for webcam, "audio" for the microphone). we pass in a reference to the onSuccess() and onError() functions which will be executed based on whether the user grants us access to the requested media types 
	navigator.getUserMedia({
		video: true,
		audio: true,
	}, onSuccess, onError)

	console.log("Success!")

} else {
	// throw an error if the getUserMedia() method is unsupported by the user's browser
	throw new Error("Sorry, getUserMedia() is not supported in your browser. Use a modern browser with WebRTC support.")

	console.log("Error!")

}