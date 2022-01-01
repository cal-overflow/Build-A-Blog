---
title: Building a Security System 📸
slug: building-a-security-system
date: October 14, 2021
img: security-system-snippet.png
categories:
  - Portfolio
---

Picture this: You had a great time building your last side project over winter break but have since taken a break from side projects to focus on school. That’s the headspace I was in last spring after refining my previous project, [CyRun](/post/cyrun). The semester was ending, and I was getting ready to start my [software engineering apprenticeship](https://www.sourceallies.com/2021/09/2021-apprentices-part-1).

<!--more-->

### What does this have to do with building a security system?

Months had passed since my last project, and I was eager to start developing software again. I wasn’t quite sure what to build, though. That is until I overheard that the Ring Doorbell my family recently purchased cost over $100. I immediately decided that my next project was going to be a security system. I wanted to challenge myself to build a (reliable) security system for relatively cheap. Besides, how difficult could it be to create a fully functional security system?

Pretty difficult, it turns out. So difficult, in fact, that I didn’t complete the project. I left the software in a functional state but have shifted my focus elsewhere after running into issues with the hardware I initially hoped to use. Although I didn’t assemble the project, I’ve decided to unfold my experiences and what I learned while developing the system in this blog post.

---

I began the project by checking out the [OpenCV](https://opencv.org/) library, which allows a Python program to interact and process frames from input devices such as cameras. It didn’t take me long to have a Python script that could detect movement. Shortly after learning the basics of the image processing library, I started developing the server-client relationship. This relationship boils down to one main idea. The server is constantly receiving frames from the client, a computer with a connected camera.

| ![Diagram of client and server relationship](/blog-images/security-system-diagram.png) |
| :--: |
| Server-Client relationship |

This worked great until I decided to try connecting a second client and streaming its video. This was when I realized the first noteworthy issue. After the server started receiving data from the first client, it became stuck receiving and processing that video feed. After many unsure iterations of switching back and forth between multi-processing and multi-threading, I finally implemented multi-processing in the server. In a basic sense, multi-processing allows the server to spawn individual processes for each camera that connects.

Security Systems exist for a reason. They are most often used to prevent and, in the worst case, record suspicious activity. That’s why the following two features I implemented are those triggered when a client detects motion. These features are (1) recording video leading up to and after suspicious activity (movement) is detected and (2) alerting the user whenever movement is detected.

```python
def processFrame(data, address, id, recording, FRAMES):
  '''Process the frame. Handle recording and alert decisions.'''

  if data['MOTION'] or recording:
    if (getAlertStatus() == 'on') and not recording:
      alert(id) # Alert when motion (recording) first starts and alerts are enabled

    recording, output_file = record(FRAMES[address[1]], recording, int(ENV('seconds')), id)
    processed_frame = drawRecording(data['FRAME'], data['WIDTH'], data['HEIGHT'])

    if not recording:
      # No longer recording. Throw away all but last few frames
      temp_frames = FRAMES[address[1]]
      temp_frames = temp_frames[(len(temp_frames) - (data['FPS'] * int(ENV('SECONDS')))):]
      if output_file is not None:
        print('Video recording saved to {}'.format(output_file))
    
    else:
      temp_frames = None
  
  else:
    processed_frame = data['FRAME']
    temp_frames = None
  
  return processed_frame, recording, temp_frames
```

Implementing the recording of videos wasn’t all too difficult. I simply had the server remember the last 30 seconds worth of frames. Once the 30 seconds had passed, those older frames were disregarded unless the system was recording. If the camera detects motion, the server saves all frames until 30 seconds of no movement occurs. The frames are then processed into a video file for later viewing.

Alerts were straightforward. I connected a Google Mail account used to send alerts (emails) whenever the server realizes motion has started. A user could easily add any number of email addresses to the recipients.

---

The last big piece of the system is the user interface. That’s where the [Flask](https://flask.palletsprojects.com) web server came into play, and most optimization challenges were faced. Designing the user interface wasn’t problematic in any way. The main struggle appeared when I wanted to live-stream the frames that the server was receiving. The webserver and server run independently but on the same computer. For the webserver to render a frame from the server, it must be stored in a file. This is where the complication occurred.

See, the issue is that the server and webserver are not in sync. The webserver would occasionally read an image file that the server was in the process of writing. This resulted in the webserver rendering images only partially written to file, which appeared as flickering on the website. Occasional flickering isn’t a severe issue, but I’m a perfectionist, so I couldn’t help but optimize the live stream.

```python
def writeToFile(id, frame):
  if readLock(id) == 'unlocked':
    lock(id)
    filename = 'data/stream_frames/{}/frame.jpg'.format(id)

    cv.imwrite(filename, frame)
    unlock(id)

def readFile(id):
  if readLock(id) == 'unlocked':
    lock(id)
    
    filename = 'data/stream_frames/{}/frame.jpg'.format(id)
    img = cv.imread(filename, cv.IMREAD_UNCHANGED)
    unlock(id)

    return img
```

To fix the issue, I created a lock system so that only one file could read/write from the file at a time. Therefore, the webserver only updates its frame if the new image file is unlocked. This created a relatively smooth live-streaming experience on the website.

The rest of my time developing the software was spent writing detailed documentation and automating much of the install process. The build script I created allows users to choose the platform software (client or server) they’re installing. The user is then prompted with numerous system options, such as the maximum number of clients that can connect at once. The script validates that Python is up-to-date and then attempts to install the necessary libraries.

I had a great time working on the system itself. Still, I feel the most rewarded by what I learned while writing [thorough documentation](https://github.com/ChristianLisle/Security-System#security-system). Creating a bash script to automate some of the heavy lifting was a fun learning experience. Feel free to take a complete look at the project on the [repository](https://github.com/ChristianLisle/Security-System).

---

### See it in action

Reading about software is fun, but what’s even better is viewing that software in action. Here’s a video where I demonstrate the live stream and recording captured when motion was detected. I’ve set up the system in my apartment in this demonstration.

<iframe src="https://www.youtube.com/embed/hgwknEyyTGQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="youtube-embed"></iframe>