using UnityEngine;
using System.Collections;

public class MazeFloorController : MonoBehaviour {
	
	void Start () {
		Input.gyro.enabled = true;
	}
	
	void Update() {
		transform.rotation = Input.gyro.attitude;
	}
}