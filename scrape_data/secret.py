import zlib
from base64 import urlsafe_b64encode as b64e, urlsafe_b64decode as b64d

def foobar(obscured:bytes) -> bytes:
    return zlib.decompress(b64d(obscured))

foo = b'eNrLMc0tBQADogGE'
bar = b'eNrzTsxJzUzJL07OL0g0MjY2VgQAOW0FvA=='

account = foobar(foo).decode()
password = foobar(bar).decode()